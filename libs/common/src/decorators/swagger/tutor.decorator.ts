import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AchievementResponse, FullTutorProfileResponse, TutorProfileResponse } from '@tutor/responses';
import { CreateAchievementDTO, CreateTutorProfileDTO, UpdateAchievementDTO, UpdateTutorProfileDTO } from '@tutor/dto';
import { DeleteResponse } from '@common/responses';

export function TutorFindOneSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: "Retrieves tutor's profile with given userID" }),
    ApiOkResponse({ type: FullTutorProfileResponse }),
    ApiNotFoundResponse({ description: 'User not found' }),
  );
}

export function TutorCreateProfileSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Creates profile for tutor with given userID' }),
    ApiBody({ type: CreateTutorProfileDTO }),
    ApiCreatedResponse({ type: TutorProfileResponse }),
    ApiBadRequestResponse({ description: 'This tutor already has a profile' }),
    ApiForbiddenResponse({ description: 'User is not tutor' }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function TutorUpdateProfileSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Updates profile of tutor with given userID' }),
    ApiBody({ type: UpdateTutorProfileDTO }),
    ApiOkResponse({ type: TutorProfileResponse }),
    ApiBadRequestResponse({ description: 'This user does not have a profile' }),
    ApiForbiddenResponse({ description: "Profile can't be updated" }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function TutorAddAchievementSwaggerDecorator() {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({ type: CreateAchievementDTO }),
    ApiOperation({ summary: 'Creates achievement for tutor with given userId' }),
    ApiCreatedResponse({ type: AchievementResponse }),
    ApiNotFoundResponse({ description: "Tutor's profile not found" }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function TutorUpdateAchievementSwaggerDecorator() {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiOperation({ summary: 'Updates achievement for tutor with given userId' }),
    ApiBody({ type: UpdateAchievementDTO }),
    ApiOkResponse({ type: AchievementResponse }),
    ApiForbiddenResponse({ description: 'Confirmed achievement can not be updated' }),
    ApiNotFoundResponse({ description: "Tutor's profile not found or This tutor does not have such an achievement" }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function TutorDeleteAchievementSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Deletes achievement' }),
    ApiOkResponse({ type: DeleteResponse }),
    ApiNotFoundResponse({ description: "Tutor's profile not found or This tutor does not have such an achievement" }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function TutorConfirmAchievementSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Sets isConfirmed field of achievement to TRUE' }),
    ApiOkResponse({ type: AchievementResponse }),
    ApiNotFoundResponse({ description: "Tutor's profile not found or This tutor does not have such an achievement" }),
    ApiBearerAuth('JWT-auth'),
  );
}
