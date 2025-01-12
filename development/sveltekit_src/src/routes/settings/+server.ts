import { json, type RequestHandler } from "@sveltejs/kit"


export const POST: RequestHandler = async ({request, locals}) => {

    const username = locals.session?.user?.id!
    const requestData = await request.json()
    const action = requestData.action
    const addressBook = requestData.addressBook

    console.log({action, username, addressBook})

    return json({
        "aaa": "bbb"
    })
}
