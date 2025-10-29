// cucumber.js
export default {
  paths: ['features/**/*.feature'],
  require: [
    'step_definitions/**/*.js',
    'features/support/**/*.js'
  ],
  format: [
    'summary',
    'progress-bar'
  ],
  publishQuiet: true
}