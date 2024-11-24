module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
      {
        type: 'list',
        name: 'pathChoice',
        message: 'Choose component path:',
        choices: ['ui', 'components', 'your own'],
      },
      {
        type: 'input',
        name: 'path',
        message: 'Enter the file path from src directory:',
        when: answers => answers.pathChoice === 'your own',
      },
    ],
    actions: data => {
      let path;
      if (data)
        path = data.pathChoice === 'your own' ? data.path : data.pathChoice;
      else throw new Error("Data doesn't exist");

      return [
        {
          type: 'add',
          path: `${path}/{{pascalCase name}}/{{pascalCase name}}.tsx`,
          templateFile: './Component/Component.tsx.hbs',
        },
        {
          type: 'add',
          path: `${path}/{{pascalCase name}}/index.ts`,
          templateFile: './Component/index.ts.hbs',
        },
      ];
    },
  });
};
