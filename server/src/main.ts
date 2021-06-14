import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
const start = async () => {
    try {
        const PORT = process.env.PORT || 5000
        const app = await NestFactory.create(AppModule)
        app.enableCors()
        const options= new DocumentBuilder()
            .setTitle('Deltaton API')
            .setDescription('Simple API')
            .setVersion('1.0.0')
            .build()
        const document = SwaggerModule.createDocument(app, options)
        SwaggerModule.setup('api', app, document)
        await app.listen(PORT, () => console.log(`server started on port ${PORT} `))
    } catch (e) {
        console.log(e)
    }
}
start() 