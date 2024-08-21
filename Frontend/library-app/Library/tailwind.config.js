/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.tsx', './src/**/*.{tsx,ts}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    dark: '#05CDFA',
                    light: '#05CDFA',
                },
                background: {
                    dark: '#02222E',
                    light: '#FFFFFF',
                },
                text: {
                    dark: '#FFFFFF',
                    light: '#000000',
                },
            },
            height: {
                '9/10': '90%',
                '4/10': '40%',
                '6/10': '60%',
                '2/10': '20%',
            },
            width: {
                '4/10': '40%',
            },
        },
    },
    plugins: [],
};
