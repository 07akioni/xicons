const fs = require('fs').promises
const path = require('path')
const config = require('./config')
const {
  naiveSvg
} = require('./utils')

async function traverse (basePath, cb, depth = 0) {
  const files = await fs.opendir(basePath)
  for await (const file of files) {
    const maybeFilePath = path.resolve(basePath, file.name)
    if (file.isDirectory()) {
      await traverse(maybeFilePath, cb, depth + 1)
    } if (file.isFile()) {
      await cb(file.name, maybeFilePath, depth)
    }
  }
}

;(async () => {
  for (const { name: iconSetName, src, normalizeName, filter } of config) {
    const svgPath = path.resolve(__dirname, '..', 'resources', iconSetName, src)
    const outPath = path.resolve(__dirname, '..', iconSetName)
    if (!(await fs.stat(outPath).catch(() => false))) {
      await fs.mkdir(outPath)
    }
    console.log(`${iconSetName}`)
    console.log(`${iconSetName}.svgPath: ${svgPath}`)
    const iconSetIconNames = []
    await traverse(svgPath, async (name, filePath, depth) => {
      if (filter && !filter({ depth })) return
      if (name.endsWith('.svg')) {
        const normalizedName = normalizeName(name.replace('.svg', ''))
        iconSetIconNames.push(normalizedName)
        const nSvg = naiveSvg(
          (await fs.readFile(filePath) ).toString()
        )
        nSvg.removeComment()
        nSvg.removeUselessTags()
        nSvg.removeAttr('id')
        nSvg.removeSvgAttr('width', 'height')
        nSvg.refill()

        const svg = nSvg.getSvg()
        await fs.writeFile(
          path.resolve(outPath, normalizedName + '.svg'),
          svg
        )
        await fs.writeFile(
          path.resolve(outPath, normalizedName + '.vue'),
          `<template>${svg}</template>`
        )
      }
    })
    // generate snapshot
    iconSetIconNames.sort()
    const snapshot = iconSetIconNames.join('\n') + '\n'
    await fs.writeFile(
      path.resolve(__dirname, '..', 'snapshots', `${iconSetName}.snap.txt`),
      snapshot
    )

    const importStmts = iconSetIconNames.map(n => `import ${n} from './${n}.js'`).join('\n') + '\n'
    const exportStmts = 'export {\n' + iconSetIconNames.map(n => `  ${n}`).join(',\n') + '\n}\n'
    const esmIndexFile = `${importStmts}\n${exportStmts}`
    await fs.writeFile(
      path.resolve(outPath, 'index.js'),
      esmIndexFile
    )
    // currently not support cjs
    
    // const requireStmts = iconSetIconNames.map(n => `const ${n} = require('./${n}.js')`).join('\n') + '\n'
    // const cjsExportStmts = iconSetIconNames.map(n => `exports.${n} = ${n}`).join('\n') + '\n'
    // const cjsIndexFile = `${requireStmts}\n${cjsExportStmts}`
    // await fs.writeFile(
    //   path.resolve(outPath, 'index.cjs.js'),
    //   cjsIndexFile
    // )
    const asyncImportStmts = iconSetIconNames.map(n => `const ${n} = () => import('./${n}.js')`).join('\n') + '\n'
    const asyncExportStmts = 'export {\n' + iconSetIconNames.map(n => `  ${n}`).join(',\n') + '\n}\n'
    const asyncIndexFile = `${asyncImportStmts}\n${asyncExportStmts}`
    await fs.writeFile(
      path.resolve(outPath, 'async-index.js'),
      asyncIndexFile
    )
  }
})()
