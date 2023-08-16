import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { INestApplication } from '@nestjs/common';

const styles = fs.readFileSync(path.join(__dirname, '../src/swaggerDark.css'), 'utf8');

async function swaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('TutorHub REST API')
    .setDescription('Documentation for TutorHub REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, {
    customCss: `${styles}`,
  });
}

export default swaggerSetup;
