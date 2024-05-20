import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()       //Документация проекта
        .setTitle('Backend')
        .setDescription('Documentation for my app')
        .setVersion('1.0.0')
        .addTag('SB')
        .build();
    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('/api/docs', app, document);   // Документация будет доступна по адресу /api/docs

    app.useGlobalPipes(new ValidationPipe())

   await app.listen(PORT, ()=>{ console.log(`Server started on port ${PORT}`) });
}

start()