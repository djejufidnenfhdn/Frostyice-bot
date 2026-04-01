let handler = async (m, { conn, command }) => {
    let isOpen = command === 'aperto'
    await conn.groupSettingUpdate(m.chat, isOpen ? 'not_announcement' : 'announcement')
    await conn.sendMessage(m.chat, {
        text: isOpen ? '𝐩𝐚𝐫𝐥𝐚𝐭𝐞 𝐩𝐮𝐫𝐞, 𝐠𝐫𝐮𝐩𝐩𝐨 𝐚𝐩𝐞𝐫𝐭𝐨 ╰‿╯' : '𝐚𝐝𝐞𝐬𝐬𝐨 𝐩𝐚𝐫𝐥𝐨 𝐢𝐨!',
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: global.db.data.nomedelbot || `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲`
            }
        }
    }, { quoted: m })
}

handler.help = ['aperto', 'chiuso']
handler.tags = ['group']
handler.command = /^(aperto|chiuso)$/i
handler.admin = true
handler.botAdmin = true

export default handler
