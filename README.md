# Randomly
A utility for generating lots of random numbers without being too tasking on the browser. Randomly accomplishes this by generating a set of random numbers on a given interval.

Subsequent requests for random numbers are served from the generated set instead of calling `Math.random`. In addition to getting random numbers, some useful methods have also been added around random numbers.

## Developing

### Conventional Commits

Commits should use the format `<type>(scope): message`. The default preset is using "angular" conventions.

`<type>` must be one of the following:

* build: Changes that affect the build system or external dependencies (example * scopes: gulp, broccoli, npm)
* ci: Changes to our CI configuration files and scripts (example scopes: Travis, * Circle, BrowserStack, SauceLabs)
* docs: Documentation only changes
* feat: A new feature
* fix: A bug fix
* perf: A code change that improves performance
* refactor: A code change that neither fixes a bug nor adds a feature
* style: Changes that do not affect the meaning of the code (white-space, * formatting, missing semi-colons, etc)
* test: Adding missing tests or correcting existing tests
