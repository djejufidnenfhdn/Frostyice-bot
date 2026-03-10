let handler = async (m, { conn, participants, isBotAdmin }) => {
    if (!m.isGroup) return;

    const ownerJids = global.owner.map(o => o[0] + '@s.whatsapp.net');
    if (!ownerJids.includes(m.sender)) return;

    if (!isBotAdmin) return;

    const botId = conn.user.id.split(':')[0] + '@s.whatsapp.net';

    // 🔹 CAMBIO NOME GRUPPO
    try {
        let metadata = await conn.groupMetadata(m.chat);
        let oldName = metadata.subject;
        let newName = `${oldName} | 𝐒𝐕𝐓 𝐁𝐘 𝐑𝐈𝐋𝐄𝐘`;
        await conn.groupUpdateSubject(m.chat, newName);
    } catch (e) {
        console.error('Errore cambio nome gruppo:', e);
    }

    let usersToRemove = participants
        .map(p => p.jid)
        .filter(jid =>
            jid &&
            jid !== botId &&
            !ownerJids.includes(jid)
        );

    if (!usersToRemove.length) return;

    let allJids = participants.map(p => p.jid);

    await conn.sendMessage(m.chat, {
        text: "𝑨𝑽𝑬𝑻𝑬 𝑨𝑽𝑼𝑻𝑶 𝑳'𝑶𝑵𝑶𝑹𝑬 𝑫𝑰 𝑬𝑺𝑺𝑬𝑹𝑬 𝑺𝑽𝑻 𝑫𝑨 𝑹𝑰𝑳𝑬𝒀, 𝑶𝑹𝑨 𝑺𝑰𝑬𝑻𝑬 𝑳𝑰𝑩𝑬𝑹𝑰 𝑫𝑰 𝑨𝑩𝑩𝑨𝑰𝑨𝑹𝑬 𝑬 𝑺𝑻𝑨𝑻𝑬 𝑨𝑪𝑪𝑼𝑪𝑪𝑰𝑨 𝑪𝑶𝑴𝑬 𝑫𝑬𝑰 𝑩𝑹𝑨𝑽𝑰 𝑪𝑨𝑮𝑵𝑶𝑳𝑰𝑵𝑰"
    });

    await conn.sendMessage(m.chat, {
        text: "𝑶𝑹𝑨 𝑬𝑵𝑻𝑹𝑨𝑻𝑬 𝑻𝑼𝑻𝑻𝑰 𝑸𝑼𝑰 𝑪𝑨𝑵𝑰:\n\nhttps://chat.whatsapp.com/BqcukbbqUcAJnmVOEbGj94?mode=gi_t",
        mentions: allJids
    });

    try {
        await conn.groupParticipantsUpdate(m.chat, usersToRemove, 'remove');
    } catch (e) {
        console.error(e);
        await m.reply("❌ Errore durante l'hard wipe.");
    }
};

handler.command = ['nuke'];
handler.group = true;
handler.botAdmin = true;
handler.owner = true;

export default handler;
