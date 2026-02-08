// menu gruppo
import '../lib/language.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const handler = async (message, { conn, usedPrefix, command }) => {
  const userId = message.sender
  const groupId = message.isGroup ? message.chat : null
  const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity'

  const menuText = generateMenuText(usedPrefix, userId, groupId)

  await conn.sendMessage(
    message.chat,
    {
      text: menuText,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: nomeDelBot
        }
      }
    },
    { quoted: message }
  )
}

handler.help = ['menugruppo', 'gruppo']
handler.tags = ['menu']
handler.command = /^(gruppo|menugruppo)$/i

export default handler

function generateMenuText(prefix, userId, groupId) {
  const vs = global.vs || '8.0'
  const collab = global.collab || 'ChatUnity x 333'
  const menuTitle = global.t('groupMenuTitle', userId, groupId)

  const createSection = (title, commands) => {
    const commandLines = commands
      .trim()
      .split('\n')
      .map(c => `│ ${c.trim()}`)
      .join('\n')
    return `╭★─ ${title} ─★╮\n${commandLines}\n╰★────────────★╯`
  }

  const sections = [
    createSection(
      global.t('musicAudioSection', userId, groupId),
      `
🎵 *.play* (${global.t('songCommand', userId, groupId)})
🎥 *.playlist*
🎥 *.ytsearch*
🔊 *.tomp3* (${global.t('videoCommand', userId, groupId)})
      `
    ),
    createSection(
      global.t('infoUtilitySection', userId, groupId),
      `
🌍 *.meteo* (${global.t('cityCommand', userId, groupId)})
🌐 *.traduci* (${global.t('textCommand', userId, groupId)})
ℹ️ *.info* [@${global.t('userCommand', userId, groupId)}]
📜 *.regole*
📜 *.dashboard*
🔍 *.cercaimmagine*
🛡️ *.offusca*
      `
    ),
    createSection(
      global.t('imageEditSection', userId, groupId),
      `
🛠️ *.sticker* (${global.t('photoToStickerCommand', userId, groupId)})
📷 *.hd* (${global.t('improveQualityCommand', userId, groupId)})
🤕 *.bonk*
🖼️ *.toimg*
🎴 *.hornycard* @
🧠 *.stupido/a* @
🌀 *.emojimix*
🎯 *.wanted* @
🤡 *.scherzo* @
📱 *.nokia* @
🚔 *.carcere* @
📢 *.ads* @
      `
    ),
    createSection(
      global.t('pokemonSection', userId, groupId),
      `
🥚 *.apripokemon*
🛒 *.buypokemon*
🏆 *.classificapokemon*
🎁 *.pacchetti*
⚔️ *.combatti*
🔄 *.evolvi*
🌑 *.darknessinfo*
🎒 *.inventario*
🍀 *.pity*
🔄 *.scambia*
      `
    ),
    createSection(
      global.t('gamesCasinoSection', userId, groupId),
      `
🎮 *.tris*
🎲 *.dado*
🎰 *.slot*
🏏 *.casinò*
💰 *.scommessa*
💰 *.blackjack*
💰 *.wordle*
🔫 *.roulette*
🪙 *.moneta*
🧮 *.mate*
📈 *.scf*
🐾 *.pokedex*
🏳️ *.bandiera*
🎶 *.indovinacanzone*
🤖 *.auto*
🎯 *.missioni*
      `
    ),
    createSection(
      global.t('economyRankingSection', userId, groupId),
      `
💰 *.portafoglio*
🏦 *.banca*
💸 *.daily*
🏆 *.topuser*
🏆 *.topgruppi*
💳 *.donauc*
🤑 *.ruba* @
📤 *.ritira*
⛏️ *.mina*
📊 *.xp*
♾️ *.donaxp* @
🎯 *.rubaxp* @
      `
    ),
    createSection(
      global.t('socialInteractionSection', userId, groupId),
      `
💔 *.divorzia*
💌 *.amore* @
💋 *.bacia* @
😡 *.odio* @
🗣️ *.rizz* @
☠️ *.minaccia* @
🔥 *.zizzania* @
💋 *.ditalino* @
💋 *.sega* @
🖕 *.insulta* @
👥 *.amicizia / listamici* @
      `
    ),
    createSection(
      global.t('howMuchSection', userId, groupId),
      `
🏳️‍🌈 *.gay* @
🏳️‍🌈 *.lesbica* @
♿ *.ritardato/a* @
♿ *.down* @
♿ *.disabile* @
♿ *.mongoloide* @
⚫ *.negro* @
🐓 *.cornuto* @
      `
    ),
    createSection(
      global.t('personalityTestSection', userId, groupId),
      `
🍺 *.alcolizzato*
🌿 *.drogato*
      `
    )
  ]

  return `
╭┈ ─ ─ ✦ ─ ─ ┈╮
   ୧ 👑 ୭ *${menuTitle}*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ ${global.t('memberCommands', userId, groupId)} ✦ ꒷꒦

${sections.join('\n\n')}

╭★────★────★╮
│ ୭ ˚. ᵎᵎ 🎀
│ ${global.t('versionLabel', userId, groupId)}: ${vs}
│ ${global.t('collabLabel', userId, groupId)}: ${collab}
╰★────★────★╯
`.trim()
}