import { version } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"


const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        openapi:"3.0.0",
        info:{
            title: "Voice Social API",
            version:"1.0.0",
            description: "API para sistema de gestor de opiniones",
            version: "1.0.0",
            description: "API para un sistema de gestión de opioniones",
            contact:{
                name: "Oliver Sales",
                email: "osales-2020584@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3002/voiceSocial/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/user/*.js",
        "./src/category/*.js",
        "./src/post/*.js",
        "./src/comment/*.js",
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/category/category.routes.js",
        "./src/post/post.routes.js",
        "./src/comment/comment.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi}