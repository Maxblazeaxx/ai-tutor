const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

async function build() {
  const buildDir = path.join(__dirname, "build");
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  // Copy index.html to build
  fs.copyFileSync(
    path.join(__dirname, "public", "index.html"),
    path.join(buildDir, "index.html")
  );

  console.log("Compiling React application with esbuild...");
  const start = Date.now();

  await esbuild.build({
    entryPoints: [path.join(__dirname, "src", "index.jsx")],
    bundle: true,
    outfile: path.join(buildDir, "bundle.js"),
    minify: false,
    sourcemap: true,
    loader: {
      ".js": "jsx",
      ".jsx": "jsx",
      ".css": "css"
    },
    define: {
      "process.env.NODE_ENV": '"development"'
    }
  });

  console.log(`React build completed in ${Date.now() - start}ms! Output: ${buildDir}`);
}

build().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
