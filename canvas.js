

(function() {
    'use strict';

    console.log('[RedTeam] Watermark Bypass: Injecting Canvas Hook...');

    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;

    HTMLCanvasElement.prototype.toDataURL = function(type, encoderOptions) {
       
        const looksLikeWatermarkSize = this.width > 100 && this.width < 500 && this.width === this.height;

       
        
        if (looksLikeWatermarkSize) {
            console.log(`[RedTeam] Detected watermark generation (Size: ${this.width}x${this.height}). Neutralizing...`);
            
            // 
            return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
        }

        //
        return originalToDataURL.apply(this, arguments);
    };

   
    const originalAttachShadow = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function(init) {
        if (init && init.mode === 'closed') {
            console.log('[RedTeam] Intercepted closed ShadowDOM creation. Forcing open...');
            const root = originalAttachShadow.call(this, { ...init, mode: 'open' });
            
            return root;
        }
        return originalAttachShadow.apply(this, arguments);
    };

})();
