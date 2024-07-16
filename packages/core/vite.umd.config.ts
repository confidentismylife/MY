import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


export default defineConfig({
  plugins: [vue()],
  build:{
    outDir:"dist/umd",
    lib: {
      entry: path.resolve(__dirname, './index.ts'),
      name: 'toy-element',
      fileName: 'index',
      formats: ['umd']
  },
  rollupOptions: {
    external: ['vue'],
    output: {
      exports:"named",
      globals: {
        vue: 'Vue',
      
      },
      assetFileNames:(assetInfo)=>{
            if(assetInfo.name==="style.css") return "index.css";
            return assetInfo.name as string;
      }
  }}
}})