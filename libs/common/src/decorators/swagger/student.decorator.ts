import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { StudentProfileResponse } from '@student/responses';
import { CreateStudentProfileDTO, UpdateStudentProfileDTO } from '@student/dto';

export function StudentFindOneSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: "Retrieves student's profile with given userID" }),
    ApiOkResponse({ type: StudentProfileResponse }),
    ApiNotFoundResponse({ description: 'Profile not found' }),
  );
}

export function StudentCreateProfileSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Creates profile for authorized student' }),
    ApiBody({ type: CreateStudentProfileDTO }),
    ApiCreatedResponse({ type: StudentProfileResponse }),
    ApiBadRequestResponse({ description: 'This student already has a profile' }),
    ApiForbiddenResponse({ description: 'User is not student' }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function StudentUpdateProfileSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Updates profile of authorized student' }),
    ApiBody({ type: UpdateStudentProfileDTO }),
    ApiOkResponse({ type: StudentProfileResponse }),
    ApiBadRequestResponse({ description: 'This user does not have a profile' }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiBearerAuth('JWT-auth'),
  );
}
