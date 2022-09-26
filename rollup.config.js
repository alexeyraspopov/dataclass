import copy from "rollup-plugin-copy";
import size from "rollup-plugin-bundle-size";

export default {
  input: "modules/Data.js",
  output: [{ file: "build/dataclass.js", format: "cjs" }],
  plugins: [
    copy({
      targets: [
        { src: "modules/Data.js", dest: "build", rename: "dataclass.module.js" },
        { src: ["typings/*", "LICENSE"], dest: "build" },
        { src: "README.md", dest: "build", transform: generateReadme },
        { src: "package.json", dest: "build", transform: generatePkg },
      ],
    }),
    size(),
  ],
};

function generatePkg(contents) {
  let pkg = JSON.parse(contents.toString());
  return JSON.stringify(
    {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      author: pkg.author,
      license: pkg.license,
      homepage: pkg.homepage,
      repository: pkg.repository,
      main: pkg.main,
      module: pkg.module,
      types: pkg.types,
      sideEffects: pkg.sideEffects,
      files: pkg.files,
      keywords: pkg.keywords,
    },
    null,
    2,
  );
}

function generateReadme() {
  return `
The library brings flexibility and usefulness of data classes from Kotlin, Scala, or Python to TypeScript and JavaScript.

Read full docs [on the homepage](https://dataclass.js.org).

\`\`\`javascript
import { Data } from "dataclass";

// 1. easily describe your data classes using just language features
class User extends Data {
  name: string = "Anon";
  age: number = 0;
}

// 2. instantiate classes while type systems ensure correctness
let user = User.create({ name: "Liza", age: 23 });
// > User { name: "Liza", age: 23 }

// 3. make changes while benefiting from immutable values
let updated = user.copy({ name: "Ann" });
// > User { name: "Ann", age: 23 }
updated = updated.copy({ name: "Liza" });
// > User { name: "Liza", age: 23 }

// 4. compare objects by their value, not reference
console.log(user === updated, user.equals(updated));
// > false, true
\`\`\`
  `.trim();
}
