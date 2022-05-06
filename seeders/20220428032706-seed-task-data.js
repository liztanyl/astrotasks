module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('users', [{
      email: 'a@a.com',
      password: '0789b45d3af07465658bc0daeddb25a4dc61a1c51ec680f8b7e8613a99c21eef7b6f2f2ae4d636f363221af506d7bf8ed4573b6ed36fecb0ed71094ec614e2ee',
      name: 'Aa',
      bootcamp: 'FTBC6',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      email: 'b@b.com',
      password: '0789b45d3af07465658bc0daeddb25a4dc61a1c51ec680f8b7e8613a99c21eef7b6f2f2ae4d636f363221af506d7bf8ed4573b6ed36fecb0ed71094ec614e2ee',
      name: 'Ba',
      bootcamp: 'FTBC6',
      created_at: new Date(),
      updated_at: new Date(),
    }]);

    const tags = [
      {
        name: 'pre-class',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'post-class',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'personal',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'work',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'project',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'others',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const tasks = [
      {
        name: '1.3: High Card DOM',
        url: 'https://bootcamp.rocketacademy.co/1-frontend-basics/1.3-high-card-dom',
        course_date: '12-01-2022',
        user_id: 1,
        completed: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '1.4: setTimeout',
        url: 'https://bootcamp.rocketacademy.co/1-frontend-basics/1.4-settimeout',
        course_date: '12-01-2022',
        user_id: 1,
        completed: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'CSS.1: Basic CSS (Exercises Part 1)',
        url: 'https://bootcamp.rocketacademy.co/css/css.1-basic-css',
        course_date: '12-01-2022',
        user_id: 1,
        completed: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '1.POCE.1: Noodle Recipe Website',
        url: 'https://bootcamp.rocketacademy.co/1-frontend-basics/1.poce-post-class-exercises/1.poce.1-noodles',
        course_date: '11-01-2022',
        user_id: 1,
        completed: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const [PCE, POCE] = await queryInterface.bulkInsert('tags', tags, { returning: true });
    const [pce1, pce2, pce3, poce1] = await queryInterface.bulkInsert('tasks', tasks, { returning: true });

    const tasksTags = [
      {
        task_id: pce1.id,
        tag_id: PCE.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        task_id: pce2.id,
        tag_id: PCE.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        task_id: pce3.id,
        tag_id: PCE.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        task_id: poce1.id,
        tag_id: POCE.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('tasks_tags', tasksTags);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('tasks_tags', null, {});
    await queryInterface.bulkDelete('tasks', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('tags', null, {});
  },
};
