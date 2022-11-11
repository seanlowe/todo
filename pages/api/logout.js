

export default async function handler( req, res ) {
  switch ( req.method ) {
  case 'POST':
    return store( req, res )
  default:
    console.error( 'there was an error, no applicable action:', req.method )
    break
  }

  res.end()
}