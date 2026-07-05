// ============================================
// 1. FILTERS + IMAGE VALUES
// ============================================
const inputs = document.querySelectorAll('.filter-grid input');

function handleUpdate() {
    const suffix = this.dataset.sizing || '';
    const value = this.value + suffix;
    
    document.documentElement.style.setProperty(`--${this.name}`, value);

    const display = document.getElementById(`${this.id}-value`);
    if (display) {
        display.textContent = value;
        display.classList.remove('pop');
        void display.offsetWidth;
        display.classList.add('pop');
    }
    
    setTimeout(adjustPositions, 10);
}

inputs.forEach(input => input.addEventListener('input', handleUpdate));

// ============================================
// 2. PRESETS
// ============================================
const presets = {
    vintage: {
        saturate: '80',
        sepia: '30',
        contrast: '110',
        brightness: '95',
        hueRotate: '0',
        grayscale: '0'
    },
    neon: {
        saturate: '180',
        hueRotate: '280',
        contrast: '120',
        brightness: '110',
        sepia: '0',
        grayscale: '0'
    },
    warm: {
        saturate: '120',
        sepia: '20',
        hueRotate: '350',
        contrast: '105',
        brightness: '105',
        grayscale: '0'
    },
    cold: {
        saturate: '110',
        hueRotate: '200',
        contrast: '110',
        brightness: '105',
        sepia: '0',
        grayscale: '0'
    },
    bw: {
        grayscale: '100',
        saturate: '0',
        contrast: '130',
        brightness: '100',
        sepia: '0',
        hueRotate: '0'
    },
    reset: {
        spacing: '10',
        blur: '10',
        scale: '1',
        rotate: '0',
        saturate: '100',
        brightness: '100',
        contrast: '100',
        hueRotate: '0',
        grayscale: '0',
        sepia: '0',
        base: '#ffc600'
    }
};

document.querySelectorAll('.preset').forEach(btn => {
    btn.addEventListener('click', function() {
        const presetName = this.dataset.preset;
        const preset = presets[presetName];
        
        if (!preset) return;
        
        Object.keys(preset).forEach(key => {
            if (key === 'base') {
                const baseInput = document.getElementById('base');
                if (baseInput) {
                    baseInput.value = preset.base;
                    document.documentElement.style.setProperty('--base', preset.base);
                }
                return;
            }

            const input = document.getElementById(key);
            if (input) {
                const value = preset[key];
                input.value = value;

                const suffix = input.dataset.sizing || '';
                document.documentElement.style.setProperty(`--${input.name}`, value + suffix);

                const display = document.getElementById(`${input.id}-value`);
                if (display) {
                    display.textContent = value + suffix;
                    display.classList.remove('pop');
                    void display.offsetWidth;
                    display.classList.add('pop');
                }
            }
        });
        
        console.log(`Применен пресет: ${presetName}`);
        setTimeout(adjustPositions, 50);
    });
});

// ============================================
// 3. UPLOAD
// ============================================
const uploadInput = document.getElementById('upload');
const img = document.querySelector('.image-wrapper img');

uploadInput.addEventListener('change', function() {
    const file = this.files[0];
    
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            img.src = e.target.result;
            console.log('Фото загружено:', file.name);
            setTimeout(adjustPositions, 100);
        };
        
        reader.onerror = function() {
            alert('Ошибка при чтении файла');
        };
        
        reader.readAsDataURL(file);
    } else {
        alert('Пожалуйста, выберите изображение!');
        this.value = '';
    }
});

// ============================================
// 4. DOWNLOAD
// ============================================
const downloadBtn = document.getElementById('download');

function isImageLoaded() {
    return img.src && 
           img.src !== '' && 
           img.src !== window.location.href && 
           img.complete && 
           img.naturalWidth > 0;
}

downloadBtn.addEventListener('click', function() {
    if (!isImageLoaded()) {
        alert('Сначала загрузите фото!');
        return;
    }
    
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const styles = getComputedStyle(img);
        
        let scale = 1;
        const scaleMatch = styles.transform.match(/scale\(([^)]+)\)/);
        if (scaleMatch) scale = parseFloat(scaleMatch[1]);

        let rotate = 0;
        const rotateMatch = styles.transform.match(/rotate\(([^)]+)deg\)/);
        if (rotateMatch) rotate = parseFloat(rotateMatch[1]);
        
        const rad = rotate * Math.PI / 180;
        const cos = Math.abs(Math.cos(rad));
        const sin = Math.abs(Math.sin(rad));
        const w = width * scale;
        const h = height * scale;
        const canvasWidth = Math.round(w * cos + h * sin);
        const canvasHeight = Math.round(w * sin + h * cos);
        
        canvas.width = canvasWidth || width;
        canvas.height = canvasHeight || height;

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rad);
        ctx.scale(scale, scale);
        ctx.translate(-width / 2, -height / 2);
        
        ctx.filter = styles.filter || 'none';
        ctx.drawImage(img, 0, 0, width, height);
        ctx.restore();
        
        const link = document.createElement('a');
        link.download = 'edited-photo.png';
        link.href = canvas.toDataURL('image/png', 1.0);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('Фото скачано!');
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при скачивании. Попробуйте еще раз.');
    }
});

// ============================================
// 5. DRAG & DROP
// ============================================
const wrapper = document.querySelector('.image-wrapper');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    wrapper.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    wrapper.addEventListener(eventName, function() {
        wrapper.style.border = '3px dashed var(--base)';
        wrapper.style.borderRadius = '10px';
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    wrapper.addEventListener(eventName, function() {
        wrapper.style.border = 'none';
    }, false);
});

wrapper.addEventListener('drop', function(e) {
    const dt = e.dataTransfer;
    const file = dt.files[0];
    
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
            console.log('Фото загружено через Drag & Drop');
            setTimeout(adjustPositions, 100);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Перетащите изображение!');
    }
}, false);

console.log('PhotoFilter готов к работе!');
console.log('Доступные пресеты: Vintage, Neon, Warm, Cold, B&W, Reset');

// ============================================
// 6. УПРАВЛЕНИЕ РАЗМЕРАМИ
// ============================================
const actionButtons = document.getElementById('actionButtons');
const imageWrapper = document.querySelector('.image-wrapper');

function adjustPositions() {
    if (!img || !img.complete || img.naturalWidth === 0) {
        actionButtons.style.transform = 'translateY(0)';
        actionButtons.style.marginTop = '0';
        return;
    }
    
    const scaleValue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale')) || 1;
    const rotateValue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--rotate')) || 0;
    
    let normalizeDeg = rotateValue % 360;
    if (normalizeDeg < 0) normalizeDeg += 360;
    
    const rotateDeg = Math.min(normalizeDeg, 360 - normalizeDeg);
    
    // Получаем реальные размеры изображения
    const rect = img.getBoundingClientRect();
    const imgWidth = rect.width;
    const imgHeight = rect.height;
    
    // ПРОСТОЙ PADDING
    const padding = 60 + (rotateDeg / 360) * 300;
    
    // РАЗМЕРЫ ВРАППЕРА
    const w = imgWidth + padding * 2;
    const h = imgHeight + padding * 2;
    
    imageWrapper.style.minWidth = w + 'px';
    imageWrapper.style.minHeight = h + 'px';
    imageWrapper.style.padding = padding + 'px';
    
    // ОТСТУПЫ
    const topMargin = 40 + (scaleValue - 1) * 120 + (rotateDeg / 360) * 150;
    imageWrapper.style.marginTop = topMargin + 'px';
    imageWrapper.style.marginBottom = (topMargin * 0.7) + 'px';
    
    // КНОПКИ
    const shiftY = (scaleValue - 1) * 20 + (rotateDeg / 360) * 40 + 10;
    actionButtons.style.transform = `translateY(${shiftY}px)`;
    actionButtons.style.marginTop = `${shiftY * 0.3}px`;
}

document.querySelectorAll('.filter-grid input').forEach(input => {
    input.addEventListener('input', () => setTimeout(adjustPositions, 50));
});

img.addEventListener('load', adjustPositions);
window.addEventListener('resize', adjustPositions);
setTimeout(adjustPositions, 200);