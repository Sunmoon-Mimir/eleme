import { defineConfig } from 'vite'
import path from 'path'
import vitePluginImp from 'vite-plugin-imp'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: { //配置项目路径别名
            "@": path.resolve(__dirname, "src"),
            "@comps": path.resolve(__dirname, "src/components"),
            "@views": path.resolve(__dirname, "src/views"),
        },
    },
    plugins: [
        vue(),
        vitePluginImp({
            libList: [{
                libName: 'vant',
                style(name) {
                    return `vant/es/${name}/index.css`
                }
            }]
        })
    ]
})