import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { AchievementResponse, DetailsResponse, FullTutorProfileResponse } from '@tutor/responses';
import { CreateAchievementDTO, UpdateAchievementDTO, UpdateDetailsDTO } from '@tutor/dto';
import { DeleteResponse } from '@common/responses';
import { TeachingFormat } from '@prisma/client';
import { TeachingFormatsResponse } from '@tutor/responses/teaching-formats.response';

export function TutorFindOneSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: "Retrieves tutor's profile with given userID" }),
    ApiOkResponse({ type: FullTutorProfileResponse }),
    ApiNotFoundResponse({ description: 'User not found' }),
  );
}

export function TutorUpdateDetailsSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Updates details of tutor profile (bio, date of birth, etc)' }),
    ApiBody({ type: UpdateDetailsDTO }),
    ApiOkResponse({ type: DetailsResponse }),
    ApiForbiddenResponse({ description: 'Access denied' }),
  );
}

export function TutorToggleTeachingFormatSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Adds or removes available teaching formats (eg REMOTELY)',
      description: 'If tutor already has this teaching format, it will be removed, otherwise it will be added',
    }),
    ApiQuery({ name: 'format', enum: TeachingFormat }),
    ApiOkResponse({ type: TeachingFormatsResponse }),
    ApiForbiddenResponse({ description: 'Access denied' }),
  );
}

export function TutorAddAchievementSwaggerDecorator() {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({ type: CreateAchievementDTO }),
    ApiOperation({ summary: 'Creates new achievement for authorized tutor' }),
    ApiCreatedResponse({ type: AchievementResponse }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function TutorUpdateAchievementSwaggerDecorator() {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiOperation({ summary: 'Updates achievement of authorized tutor' }),
    ApiBody({ type: UpdateAchievementDTO }),
    ApiOkResponse({ type: AchievementResponse }),
    ApiForbiddenResponse({ description: 'Confirmed achievement can not be updated' }),
    ApiNotFoundResponse({ description: 'This tutor does not have such an achievement' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function TutorDeleteAchievementSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Deletes achievement of authorized tutor' }),
    ApiOkResponse({ type: DeleteResponse }),
    ApiNotFoundResponse({ description: 'This tutor does not have such an achievement' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function TutorConfirmAchievementSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Confirmation of achievement',
      description: 'Sets isConfirmed field of achievement to TRUE (ADMIN ONLY)',
    }),
    ApiOkResponse({ type: AchievementResponse }),
    ApiNotFoundResponse({ description: 'This tutor does not have such an achievement' }),
    ApiBearerAuth('JWT-auth'),
  );
}
