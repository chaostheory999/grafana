import { RuleTester } from 'eslint';

import noBorderRadiusLiteral from '../rules/no-border-radius-literal.cjs';

RuleTester.setDefaultConfig({
  languageOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

const expectedError = {
  messageId: 'borderRadiusId',
};

const ruleTester = new RuleTester();

ruleTester.run('eslint no-border-radius-literal', noBorderRadiusLiteral, {
  valid: [
    {
      code: `css({ borderRadius: theme.shape.radius.default })`,
    },
    {
      code: `css({ borderRadius: theme.shape.radius.circle })`,
    },
    {
      code: `css({ borderRadius: theme.shape.radius.pill })`,
    },
  ],

  invalid: [
    {
      code: `css({ borderRadius: '2px' })`,
      errors: [expectedError],
    },
    {
      code: `css({ lineHeight: 1 }, { borderRadius: '2px' })`,
      errors: [expectedError],
    },
    {
      code: `css([{ lineHeight: 1 }, { borderRadius: '2px' }])`,
      errors: [expectedError],
    },
    {
      name: 'nested classes',
      code: `
css({
  foo: {
    nested: {
      borderRadius: '100px',
    },
  },
})`,
      errors: [expectedError],
    },
  ],
});
