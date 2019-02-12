workflow "Master Test Run" {
  on = "push"
  resolves = ["Test"]
}

action "Setup" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  runs = "yarn install --no-lockfile"
}

action "Test" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["Setup"]
  runs = "yarn test --ci"
}
