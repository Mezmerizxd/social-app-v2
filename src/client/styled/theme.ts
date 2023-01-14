import { colorH2A } from '../lib/util';

const theme: Client.Styled.Theme = {
    colors: {
        primary: {
            hex: '#000000',
        },
        secondary: {
            hex: '#ffffff',
        },
        accent: {
            hex: '#ff0000',
        },
        white: {
            hex: '#ffffff',
        },
    },
    text: {
        primary: {
            hex: '#ffffff',
        },
        secondary: {
            hex: '#ffffff',
        },
        accent: {
            hex: '#ff0000',
        },
    },
};

for (const [name, color] of Object.entries(theme.colors)) {
    const colorRGB = colorH2A(color.hex);
    theme.colors[name].rgb = colorRGB.join(', ');
    theme.colors[name].rawRgb = colorRGB;
}
for (const [name, color] of Object.entries(theme.text)) {
    const colorRGB = colorH2A(color.hex);
    theme.text[name].rgb = colorRGB.join(', ');
    theme.text[name].rawRgb = colorRGB;
}

export default theme;
