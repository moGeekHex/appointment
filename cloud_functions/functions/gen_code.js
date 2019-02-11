const admin = require('firebase-admin');
const twilio = require('./twilio.config');
module.exports = (req , resp) => {
    //Check if params (id,phone) exists
    if(!req.body.phone || !req.body.uid)
    {
        return resp.status(400).send({ error : 'Phone and ID are required' })
    }

    //Remove non digits
    const uid = req.body.uid;
    const phone = String(req.body.phone).replace(/[^\d]/g,'');

    //Get user by id
    admin.auth().getUser(uid)
        .then( user => {
            //Generate code
            const code = Math.floor(Math.random() * 9000 + 1000 )

            //text via twilio
            twilio.messages.create({
                body : `Your Appointment code is ${code}`,
                from : '+16232997477',
                to : `+${phone}`
            }).then((message) => {
                //Save Code and phone number
                admin.database().ref(`users/${uid}`).update({phone , code}).then(() => {
                    return resp.send({ success : true })
                })
            })
              .catch((error) => {
                  return resp.status(500).send({ error : 'Faild to send SMS ', error})
              });


            //Save Code and phone number
            admin.database().ref(`users/${uid}`).update({phone,code} , () => {
                return resp.send({success : true});
            })
        })
        .catch((error) => {
            return resp.status(404).send({error : 'Account not found'})
        });
}