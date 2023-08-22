import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { INestApplication } from '@nestjs/common';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { REFRESH_TOKEN_COOKIE_NAME } from '@common/constants';

const styles = fs.readFileSync(path.join(__dirname, '../src/swaggerDark.min.css'), 'utf8');

async function swaggerSetup(app: INestApplication, isJSONToBeGenerated = false) {
  const JWTOptions: SecuritySchemeObject = {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter JWT token',
    in: 'header',
  };

  const config = new DocumentBuilder()
    .setTitle('TutorHub REST API')
    .setDescription('Documentation for TutorHub REST API')
    .setVersion('1.0')
    .addTag('Users', 'Methods for interaction with User entities')
    .addTag('Tutors', 'Methods for interaction with tutor profiles')
    .addTag('Students', 'Methods for interaction with student profiles')
    .addTag('Auth', 'Methods for authorization')
    .addBearerAuth(JWTOptions, 'JWT-auth')
    .addCookieAuth(REFRESH_TOKEN_COOKIE_NAME)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document, {
    customCss: `${styles}`,
  });

  if (isJSONToBeGenerated) {
    fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  }
}

export default swaggerSetup;
