/**
 * Sube el logo de FG Abogados como foto de perfil de todas las cuentas.
 * Requisitos:
 *   - Admin SDK API habilitada en Google Cloud
 *   - Scope https://www.googleapis.com/auth/admin.directory.user en la delegación de la cuenta de servicio
 */

const fs = require('fs')
const path = require('path')

// Cargar variables de entorno
const env = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8')
env.split('\n').forEach(line => {
  const [key, ...vals] = line.split('=')
  if (key && vals.length) process.env[key.trim()] = vals.join('=').trim()
})

const { google } = require('googleapis')

const ACCOUNTS = [
  process.env.GOOGLE_IMPERSONATE_EMAIL,  // info@fgabogados-es.com
  process.env.GOOGLE_EMAIL_MADRID,       // marta@fgabogados-es.com
  process.env.GOOGLE_EMAIL_CUENCA,       // pilar@fgabogados-es.com
]

async function setProfilePhotos() {
  const key = Buffer.from(process.env.GOOGLE_PRIVATE_KEY_B64, 'base64').toString('utf8')

  // La cuenta de servicio debe impersonar un super admin para poder editar fotos de otros usuarios
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key,
    scopes: ['https://www.googleapis.com/auth/admin.directory.user'],
    subject: process.env.GOOGLE_IMPERSONATE_EMAIL, // debe ser super admin
  })

  const logoData = fs.readFileSync(path.join(__dirname, '../public/logo.jpg'))
  const photoData = logoData.toString('base64url')

  // Impersonar a pilar@ (super admin) para actualizar las fotos de todos
  const adminAuth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key,
    scopes: ['https://www.googleapis.com/auth/admin.directory.user'],
    subject: process.env.GOOGLE_EMAIL_CUENCA, // pilar@ = super admin
  })
  const admin = google.admin({ version: 'directory_v1', auth: adminAuth })

  for (const account of ACCOUNTS) {
    try {
      await admin.users.photos.update({
        userKey: account,
        requestBody: {
          photoData,
          mimeType: 'JPEG',
          width: 96,
          height: 96,
        },
      })
      console.log('✓', account)
    } catch (err) {
      console.error('✗', account, '-', err.message)
    }
  }
}

setProfilePhotos()
