function denoModuleLookup(module) {
  result = module.match(/lodash\/(.*)/);
  if (result) {
    return `https://deno.land/x/lodash/${result[1]}.js`;
  }

  switch (module) {
    case "lru-cache":
      return "https://raw.githubusercontent.com/diaozheng999/node-lru-cache/master/index.ts";
    case "splaytree":
      return "https://unpkg.com/splaytree@3.0.1/dist/splay.esm.js";
  }
}

module.exports = {
  denoModuleLookup,
  denoOut: "./deno",
  root: "./src",
};
