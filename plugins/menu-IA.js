// menu ia
import { performance } from 'perf_hooks'
import fetch from 'node-fetch'
import '../lib/language.js'

const handler = async (message, { conn, usedPrefix }) => {
  const userId = message.sender
  const groupId = message.isGroup ? message.chat : null
  const botName = global.db.data.nomedelbot || 'ChatUnity'

  const menuText = generateMenuText(usedPrefix, botName, userId, groupId)

  const adminMenuText = global.t('menuAdmin', userId, groupId) || '🛡️ Menu Admin'
  const ownerMenuText = global.t('menuOwner', userId, groupId) || '👑 Menu Owner'
  const groupMenuText = global.t('menuGroup', userId, groupId) || '👥 Menu Gruppo'
  const securityMenuText = global.t('menuSecurity', userId, groupId) || '🚨 Menu Sicurezza'

  await conn.sendMessage(
    message.chat,
    {
      text: menuText,
      footer: global.t('chooseMenu', userId, groupId) || 'Scegli un menu:',
      buttons: [
        { buttonId: `${usedPrefix}menu`, buttonText: { displayText: global.t('mainMenuButton', userId, groupId) || '🏠 Menu Principale' }, type: 1 },
        { buttonId: `${usedPrefix}menuadmin`, buttonText: { displayText: adminMenuText }, type: 1 },
        { buttonId: `${usedPrefix}menuowner`, buttonText: { displayText: ownerMenuText }, type: 1 },
        { buttonId: `${usedPrefix}menugruppo`, buttonText: { displayText: groupMenuText }, type: 1 },
        { buttonId: `${usedPrefix}menusicurezza`, buttonText: { displayText: securityMenuText }, type: 1 }
      ],
      headerType: 1
    },
    { quoted: message }
  )
}

handler.help = ['menuia', 'menuai']
handler.tags = ['menu']
handler.command = /^(menuia|menuai)$/i

export default handler

function generateMenuText(prefix, botName, userId, groupId) {
  const vs = global.vs || '8.0'
  const menuTitle = global.t('aiMenuTitle', userId, groupId) || '𝑴𝑬𝑵𝑼 𝑰𝑨'
  const versionText = global.t('versionLabel', userId, groupId) || '𝑽𝑬𝑹𝑺𝑰𝑶𝑵𝑬'
  const supportText = global.t('supportLabel', userId, groupId) || '𝐒𝐔𝐏𝐏𝐎𝐑𝐓𝐎'
  const collabText = global.t('collabLabel', userId, groupId) || 'ChatUnity x 333'

  const commandList = `
• 🤖 *.${global.t('iaCommand', userId, groupId) || 'ia'}*
• 🤖 *.${global.t('soraCommand', userId, groupId) || 'sora'}*
• 🤖 *.${global.t('geminiCommand', userId, groupId) || 'gemini'}*
• 🤖 *.${global.t('chatgptCommand', userId, groupId) || 'chatgpt'}*
• 🤖 *.${global.t('deepseekCommand', userId, groupId) || 'deepseek'}*
• 🤖 *.${global.t('voiceCommand', userId, groupId) || 'vocale'}*
• 🤖 *.${global.t('imageCommand', userId, groupId) || 'immagine'}*
• 🤖 *.${global.t('image2Command', userId, groupId) || 'immagine2'}*
• 🤖 *.${global.t('image3Command', userId, groupId) || 'immagine3'}*
• 🤖 *.${global.t('animalInfoCommand', userId, groupId) || 'infoanimale'}*
• 🤖 *.${global.t('kcalCommand', userId, groupId) || 'kcal'}*
• 🤖 *.${global.t('summaryCommand', userId, groupId) || 'riassunto'}*
• 🤖 *.${global.t('recipeCommand', userId, groupId) || 'ricetta'}*
  `.trim()

  return `
⋆ ︵︵ ★ ${menuTitle} ★ ︵︵ ⋆

*${global.t('generalCommands', userId, groupId) || '𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝑮𝑬𝑵𝑬𝑹𝑨𝑳𝑰'}*

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
${commandList.split('\n').map(line => `୧ ${line.trim()}`).join('\n')}
꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
  ୧・*${versionText}:* ${vs}
  ୧・𝐂𝐎𝐋𝐋𝐀𝐁: ${collabText}
  ୧・*${supportText}:* (.supporto)
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
`.trim()
}