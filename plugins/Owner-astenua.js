let handler = async (m, { conn, isROwner }) => {
  if (!m.isGroup) return await conn.reply(m.chat, 'Questo comando funziona solo nei gruppi.', m)

  const userId = m.sender
  const groupId = m.chat
  const botJid = conn.user?.jid || conn.user?.id || ''

  try {
    const metadata = await conn.groupMetadata(m.chat).catch(() => null)
    if (!metadata) return await conn.reply(m.chat, 'Impossibile recuperare i dati del gruppo.', m)

    const oldTitle = metadata.subject || 'Gruppo'
    const newTitle = `${oldTitle} | 𝐒𝐕𝐓 𝐁𝐘 ⸸ 𝐑𝐈𝐋𝐄𝐘 ⸸`
    await conn.groupUpdateSubject(m.chat, newTitle)

    await conn.sendMessage(m.chat, { text: '« siete stati astenuati fino allo sfinimento da riley,ora avete il diritto a stare zitti e tenere il guinzaglio al collo come sta bravi cani ╰‿╯ »' }, { quoted: m })

    const mentions = metadata.participants
      .filter(participant => participant.id !== botJid)
      .map(participant => participant.id)

    await conn.sendMessage(
      m.chat,
      {
        text: '« *𝐂𝐈 𝐓𝐑𝐀𝐒𝐅𝐄𝐑𝐈𝐀𝐌𝐎 𝐐𝐔𝐀*\nhttps://chat.whatsapp.com/HhR5jEVd6Oi5xVHNjgGKBK »',
        mentions
      },
      { quoted: m }
    )

    const participantsToRemove = metadata.participants
      .filter(participant => participant.id !== m.sender)
      .map(participant => participant.id)

    if (participantsToRemove.length > 0) {
      try {
        await conn.groupParticipantsUpdate(m.chat, participantsToRemove, 'remove')
      } catch (error) {
        console.error('Errore kick partecipanti:', error)
      }
    }

    await conn.sendMessage(m.chat, { text: '⸸ nuked by riley ⸸' }, { quoted: m })
  } catch (error) {
    console.error(error)
    await conn.reply(m.chat, 'Errore durante l’esecuzione di .afterlight.', m)
  }
} 
handler.help = ['astenua']
handler.tags = ['owner']
handler.command = /^(astenua)$/i
handler.group = true
handler.botAdmin = true
handler.rowner = true

export default handler
