import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
    const { file } = request.request.body;

    if (!file) {
        return json({ message: 'Aucun fichier téléchargé', ok: false }, { status: 400 });
    }

    const uploadDir = path.join('src', 'lib', 'img', 'Article');
    const filePath = path.join(uploadDir, file.name);

    try {
        await fs.mkdir(uploadDir, { recursive: true });
        await fs.writeFile(filePath, Buffer.from(file.data, 'base64'));

        return json({ message: 'Le fichier a été téléchargé avec succès', ok: true }, { status: 200 });
    } catch (error) {
        return json({ message: 'Une erreur s\'est produite lors du téléchargement du fichier', error: error.message, ok: false }, { status: 500 });
    }
}
