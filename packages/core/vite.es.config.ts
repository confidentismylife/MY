import { defineConfig } from "vite";
import { readdirSync, readdir } from "fs";
import { resolve } from "path";
import { defer, delay, filter, map, includes } from "lodash-es";
import { visualizer } from "rollup-plugin-visualizer";

import shell from "shelljs";

import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import terser from "@rollup/plugin-terser";

const TRY_MOVE_STYLES_DELAY = 750 as const;

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

/**
 * 同步获取指定路径下的所有子目录名称
 *
 * @param basePath 指定的基础路径
 * @returns 返回包含所有子目录名称的数组
 */
function getDirectoriesSync(basePath: string) {
  // 读取指定路径下的文件和目录列表，并返回包含文件类型信息的数组
  const entries = readdirSync(basePath, { withFileTypes: true });

  // 过滤出目录项，并返回目录名的数组
  return map(
    // 过滤出目录项
    filter(entries, (entry) => entry.isDirectory()),
    // 提取目录名
    (entry) => entry.name
  );
}

function moveStyles() {
  readdir("./dist/es/theme", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.mv("./dist/es/theme", "./dist"));
  });
}

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      filename: "dist/stats.es.html",
    }),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ["log"],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd,
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
  ],
  build: {
    outDir: "dist/es",
    minify: false,
    cssCodeSplit: true,
    sourcemap: !isProd,
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "EricUI",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") {
            return "index.css";
          }
          if (
            chunkInfo.type === "asset" &&
            /\.(css)$/i.test(chunkInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return chunkInfo.name as string;
        },
        manualChunks(id) {
          if (includes(id, "node_modules")) return "vendor";

          if (includes(id, "/packages/hooks")) return "hooks";

          if (
            includes(id, "/packages/utils") ||
            includes(id, "plugin-vue:export-helper")
          )
            return "utils";

          for (const item of getDirectoriesSync("../components")) {
            if (includes(id, `/packages/components/${item}`)) return item;
          }
        },
      },
    },
  },
});
