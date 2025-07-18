import type { UserConfig } from "vite";

async function getCommonConfig():Promise<UserConfig>{
    return {
        build:
        {
            chunkSizeWarningLimit:2000,//(KB)大概2M
            reportCompressedSize:false,//压缩大型输出文件可能会很慢,设为false提高构建性能。
            sourcemap:false
        }
    }
}
export { getCommonConfig }