export function CurrentGpuInfo() {
    let error = '';
    let gpuInfo: {
        // vendor: string;
        renderer: string;
        // version: string;
        // shadingLanguageVersion: string;
    } | null = null;

    try {
        // 创建canvas元素来访问WebGL上下文
        const canvas = document.createElement('canvas');
        const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null

        if (!gl) {
            error = 'WebGL is not supported in your browser';
            return;
        }

        // 获取WebGL渲染器信息
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            // const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

            gpuInfo = {
                // vendor,
                renderer,
                // version: gl.getParameter(WebGLRenderingContext.VERSION),
                // shadingLanguageVersion: gl.getParameter(WebGLRenderingContext.SHADING_LANGUAGE_VERSION)
            }
        } else {
            gpuInfo = {
                // vendor: gl.getParameter(WebGLRenderingContext.VENDOR),
                renderer: gl.getParameter(WebGLRenderingContext.RENDERER),
                // version: gl.getParameter(WebGLRenderingContext.VERSION),
                // shadingLanguageVersion: gl.getParameter(WebGLRenderingContext.SHADING_LANGUAGE_VERSION)
            }
        }
    } catch (err) {
        error = '无法获取GPU信息，因为' + String(err)
    }

    if (error) {
        return (
            <>
                <h2>GPU Information</h2>
                <div className="gpu-info error">
                    <p>{error}</p>
                </div>
            </>
        );
    }

    if (!gpuInfo) {
        return (
            <>
                <h2>GPU Information</h2>
                <div className="gpu-info loading">
                    <p>加载 GPU 信息中...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <h2>GPU 信息</h2>
            <div className="gpu-info">
                <div>{gpuInfo.renderer}</div>
            </div>
        </>
    );
}
