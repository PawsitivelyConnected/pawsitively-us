import twConfig from '@root/tailwind.config.js'

export const twColor = (color: string) => twConfig.theme.extend.colors[color]
