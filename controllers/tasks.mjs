import axios from 'axios';
import { getCleanData, getScheduleJsonUrl } from '../getCourseData.mjs';

// HELPER FUNCTIONS

const getCourseDates = async (bootcampBatch) => {
  const jsonUrl = getScheduleJsonUrl(bootcampBatch);

  const { data } = await axios.get(jsonUrl);
  const { poceDate, pceDate } = getCleanData(data);
  return { poceDate, pceDate };
};

const filterTasks = (tasksArray, taskType, courseDates) => {
  if (taskType === 'pre-class' || taskType === 'post-class') {
    const courseDateStr = taskType === 'pre-class'
      ? courseDates.pceDate
      : courseDates.poceDate;

    return tasksArray
      .filter((task) => task.tags.map((tag) => (tag.name)).includes(taskType))
      .filter((task) => (task.courseDate === courseDateStr))
      .map(({
        id, name, url, courseDate, completed,
      }) => ({
        id, name, url, courseDate, completed,
      }));
  }
  return tasksArray
    .filter((task) => task.tags.map((tag) => (tag.name)).includes(taskType))
    .map(({
      id, name, url, courseDate, completed,
    }) => ({
      id, name, url, courseDate, completed,
    }));
};

const cleanTaskInfo = (courseDayInfo, userId) => {
  const newTaskInfo = {
    name: courseDayInfo.name,
    url: courseDayInfo.url,
    courseDate: courseDayInfo.courseDate,
    userId,
    pomodoros: 0,
    completed: false,
  };
  return newTaskInfo;
};

// CONTROLLER FUNCTIONS

export default function initTasksController(db) {
  const index = async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await db.User.findByPk(userId);
      const tasks = await db.Task.findAll({
        where: { userId },
        include: db.Tag,
      });

      let pceTasks = [];
      let poceTasks = [];

      if (user.bootcamp) {
        const courseDates = await getCourseDates(user.bootcamp);
        pceTasks = filterTasks(tasks, 'pre-class', courseDates);
        poceTasks = filterTasks(tasks, 'post-class', courseDates);
      }

      const personalTasks = filterTasks(tasks, 'personal');
      const workTasks = filterTasks(tasks, 'work');
      const projectTasks = filterTasks(tasks, 'project');
      const otherTasks = filterTasks(tasks, 'others');

      const dataToClient = {
        pce: pceTasks,
        poce: poceTasks,
        personal: personalTasks,
        work: workTasks,
        project: projectTasks,
        others: otherTasks,
      };

      console.log('taskcontroller datatoclient', dataToClient);
      res.send(dataToClient);
    } catch (error) {
      console.log(error.message);
      res.send(error);
    }
  };

  const fetchNew = async (req) => {
    try {
      const { homework, batch: bootcampBatch } = req.body;

      const students = await db.User.findAll({
        where: { bootcamp: bootcampBatch },
      });
      const pceTag = await db.Tag.findOne({
        where: { name: 'pre-class' },
      });
      const poceTag = await db.Tag.findOne({
        where: { name: 'post-class' },
      });

      for (let i = 0; i < students.length; i += 1) {
        const studentId = students[i].id;

        for (let j = 0; j < homework.pce.length; j += 1) {
          const newTask = cleanTaskInfo(homework.pce[j], studentId);
          db.Task.create(newTask).then((task) => task.addTag(pceTag));
        }

        for (let j = 0; j < homework.poce.length; j += 1) {
          const newTask = cleanTaskInfo(homework.poce[j], studentId);
          db.Task.create(newTask)
            .then((task) => task.addTag(poceTag));
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const show = async (req, res) => {
    try { const { id } = req.params;
      const task = await db.Task.findByPk(id, { include: db.Tag });
      const dataToClient = {
        id: task.id,
        name: task.name,
        url: task.url,
        completed: task.completed,
        tags: task.tags,
      };
      res.send(dataToClient);
    } catch (error) {
      console.log(error.message);
      res.send(error);
    }
  };

  const add = async (req, res) => {
    try {
      const { taskName: name, userId, selectedTags } = req.body;
      const newTask = {
        name,
        url: '',
        courseDate: '',
        userId,
        completed: false,
      };

      const task = await db.Task.create(newTask);
      console.log(selectedTags);

      await selectedTags.forEach((selectedTag) => {
        db.Tag.findOne({ where: { name: selectedTag } })
          .then((tag) => { console.log(tag); tag.addTask(task); });
      });

      res.send(task);
    } catch (error) {
      console.log(error.message);
      res.send(error);
    }
  };

  const edit = async (req, res) => {
    try {
      const { id } = req.params;
      const { taskName, selectedTags } = req.body;
      const updateQueries = [];

      // first update taskName
      const [, task] = await db.Task.update({ name: taskName },
        {
          where: { id },
          returning: true,
          plain: true,
        });

      // then get tags and update them
      const currentTags = await task.getTags();
      console.log('currenttags', currentTags);

      // update db to remove tags that are not in selectedTags
      currentTags.forEach((tag) => {
        if (!selectedTags.includes(tag.name)) {
          updateQueries.push(task.removeTag(tag.id));
        }
      });

      // update db to add tags that aren't in currentTags
      selectedTags.forEach((selectedTagName) => {
        db.Tag.findOne({ where: { name: selectedTagName } })
          .then((tag) => {
            console.log('selected tag', tag);
            if (!currentTags.includes(tag)) {
              updateQueries.push(task.addTag(tag));
            }
          });
      });

      await Promise.all(updateQueries);
      const updatedTask = await db.Task.findByPk(id, { include: db.Tag });
      res.send(updatedTask);
    } catch (error) {
      console.log(error.message);
      res.send(error);
    }
  };

  const destroy = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await db.Task.findByPk(id, { include: db.Tag });
      task.tags.forEach((tag) => task.removeTag(tag.id));
      await db.Task.destroy({ where: { id } });
      res.send('okay');
    }
    catch (error) {
      console.log(error.message);
      res.send(error);
    }
  };

  const update = async (req, res) => {
    try {
      const { id } = req.params;
      const { taskStatus } = req.body;
      console.log(id, taskStatus);

      await db.Task.update({ completed: !taskStatus },
        { where: { id } });

      const task = await db.Task.findByPk(id);

      const dataToClient = {
        newTaskId: task.id,
        newTaskStatus: task.completed,
      };

      console.log(dataToClient);
      res.send(dataToClient);
    } catch (error) {
      console.log(error.message);
      res.send(error);
    }
  };

  return {
    index,
    fetchNew,
    show,
    add,
    edit,
    destroy,
    update,
  };
}
