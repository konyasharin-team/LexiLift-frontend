const inquirerFuzzyPath = require('inquirer-fuzzy-path');

module.exports = (plop) => {
  plop.setPrompt('fuzzyPath', inquirerFuzzyPath);

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
        type: 'fuzzyPath',
        name: 'path',
        message: 'Enter the file path from src directory:',
        itemType: 'directory',
        rootPath: 'src',
        when: answers => answers.pathChoice === 'your own',
      },
    ],
    actions: data => {
      let path;
      if (data)
        path = data.pathChoice === 'your own' ? data.path : `src/${data.pathChoice}`;
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
