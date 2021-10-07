import copy from 'rollup-plugin-copy';
import size from 'rollup-plugin-bundle-size';

export default {
  input: 'modules/Data.js',
  output: [{ file: 'build/dataclass.js', format: 'cjs' }],
  plugins: [
    copy({
      targets: [
        { src: 'modules/Data.js', dest: 'build', rename: 'dataclass.module.js' },
        { src: ['typings/*', 'LICENSE'], dest: 'build' },
        { src: 'README_NPM.md', dest: 'build', rename: 'README.md' },
        { src: 'package.json', dest: 'build', transform: generatePkg },
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
