import { ExceptionFilter, Catch, ArgumentsHost, HttpException, ValidationError, BadRequestException, HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

interface ValidationErrorInterface {
    code: string;
    name: string;
    message: string;
    meta: object;
}
interface HttpExceptionMessage {
    code: string;
    message: string;
    validationErrors?: Array<ValidationErrorInterface>;
}

interface NestHttpExceptionMessage {
    statusCode: number;
    message: string;
    error: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof HttpException) {
            const statusCode = exception.getStatus();

            const error = <NestHttpExceptionMessage>exception.getResponse();
            if (error.statusCode) {
                const body = {
                    code: '',
                    message: error.message,
                };
                switch (error.statusCode) {
                    case 400:
                        body.code = 'TR-N0400';
                        break;
                    case 401:
                        body.code = 'TR-N0401';
                        break;
                    case 403:
                        body.code = 'TR-N0403';
                        break;
                    case 404:
                        body.code = 'TR-N0404';
                        break;
                    default:
                }
                response.status(statusCode)
                    .json({
                        error: body,
                    });
            } else {
                response.status(statusCode)
                    .json({
                        error: exception.getResponse(),
                    });
            }
        } else {
            const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            response.status(statusCode)
                .json({
                    error: {
                        code: 'TR-N0500',
                        message: 'Internal server error',
                    },
                });
            console.log(exception);
        }
    }
}

export function exceptionFactory(errors: Array<ValidationError>): void {
    const validationErrors = [];

    for (const error of errors) {
        for (const constraint in error.constraints) {
            if (Object.prototype.hasOwnProperty.call(error.constraints, constraint)) {
                let code = '';
                let constraints: object;
                switch (constraint) {
                    case 'isDefined':
                        code = '0001';
                        break;
                    case 'equals':
                        code = '0002';
                        constraints = {
                            c1: error.constraints[constraint].split(' ').pop(),
                        };
                        break;
                    case 'notEquals':
                        code = '0003';
                        constraints = {
                            c1: error.constraints[constraint].split(' ').pop(),
                        };
                        break;
                    case 'isEmpty':
                        code = '0004';
                        break;
                    case 'isNotEmpty':
                        code = '0005';
                        break;
                    case 'isIn':
                        code = '0006';
                        constraints = {
                            c1: error.constraints[constraint].split(' ').pop(),
                        };
                        break;
                    case 'isNotIn':
                        code = '0007';
                        constraints = {
                            c1: error.constraints[constraint].split(' ').pop(),
                        };
                        break;
                    case 'isBoolean':
                        code = '0008';
                        break;
                    case 'isDate':
                        code = '0009';
                        break;
                    case 'isNumber':
                        code = '0010';
                        break;
                    case 'isLatLong':
                        code = '0011';
                        break;
                    case 'isLatitude':
                        code = '0012';
                        break;
                    case 'isLongitude':
                        code = '0013';
                        break;
                    case 'isString':
                        code = '0014';
                        break;
                    case 'isDateString':
                        code = '0015';
                        break;
                    case 'isArray':
                        code = '0016';
                        break;
                    case 'isInt':
                        code = '0017';
                        break;
                    case 'isEnum':
                        code = '0018';
                        break;
                    case 'isDivisibleBy':
                        code = '0019';
                        constraints = {
                            c1: error.constraints[constraint].split(' ').pop(),
                        };
                        break;
                    case 'isPositive':
                        code = '0020';
                        break;
                    case 'isNegative':
                        code = '0021';
                        break;
                    case 'min':
                        code = '0022';
                        constraints = {
                            c1: error.constraints[constraint].split(' ').pop(),
                        };
                        break;
                    case 'max':
                        code = '0023';
                        constraints = {
                            c1: error.constraints[constraint].split(' ').pop(),
                        };
                        break;
                    case 'minDate':
                        code = '0024';
                        constraints = {
                            c1: error.constraints[constraint].split(' ').pop(),
                        };
                        break;
                    case 'maxDate':
                        code = '0025';
                        constraints = {
                            c1: error.constraints[constraint].split(' ').pop(),
                        };
                        break;
                    case 'isBooleanString':
                        code = '0026';
                        break;
                    case 'isNumberString':
                        code = '0027';
                        break;
                    case 'contains':
                        code = '0028';
                        constraints = {
                            c1: error.constraints[constraint].split(' ')[4],
                        };
                        break;
                    case 'notContains':
                        code = '0029';
                        constraints = {
                            c1: error.constraints[constraint].split(' ')[5],
                        };
                        break;
                    case 'isAlpha':
                        code = '0030';
                        break;
                    case 'isAlphanumeric':
                        code = '0031';
                        break;
                    case 'isDecimal':
                        code = '0032';
                        break;
                    case 'isAscii':
                        code = '0033';
                        break;
                    case 'isBase64':
                        code = '0034';
                        break;
                    case 'isByteLength':
                        code = '0035';
                        break;
                    case 'isCreditCard':
                        code = '0036';
                        break;
                    case 'isCurrency':
                        code = '0037';
                        break;
                    case 'isEmail':
                        code = '0038';
                        break;
                    case 'isFqdn':
                        code = '0039';
                        break;
                    case 'isFullWidth':
                        code = '0040';
                        break;
                    case 'isHalfWidth':
                        code = '0041';
                        break;
                    case 'isVariableWidth':
                        code = '0042';
                        break;
                    case 'isHexColor':
                        code = '0043';
                        break;
                    case 'isHexadecimal':
                        code = '0044';
                        break;
                    case 'isMacAddress':
                        code = '0045';
                        break;
                    case 'isIp':
                        code = '0046';
                        break;
                    case 'isPort':
                        code = '0047';
                        break;
                    case 'isIsbn':
                        code = '0048';
                        break;
                    case 'isIsin':
                        code = '0049';
                        break;
                    case 'isIso8601':
                        code = '0050';
                        break;
                    case 'isJson':
                        code = '0051';
                        break;
                    case 'isJwt':
                        code = '0052';
                        break;
                    case 'isObject':
                        code = '0053';
                        break;
                    case 'isNotEmptyObject':
                        code = '0054';
                        break;
                    case 'isLowercase':
                        code = '0055';
                        break;
                    case 'isMobilePhone':
                        code = '0056';
                        break;
                    case 'isPhoneNumber':
                        code = '0057';
                        break;
                    case 'isISO31661Alpha2':
                        code = '0058';
                        break;
                    case 'isISO31661Alpha3':
                        code = '0059';
                        break;
                    case 'isMongoId':
                        code = '0060';
                        break;
                    case 'isMultibyte':
                        code = '0061';
                        break;
                    case 'isSurrogatePair':
                        code = '0062';
                        break;
                    case 'isUrl':
                        code = '0063';
                        break;
                    case 'isUuid':
                        code = '0064';
                        break;
                    case 'length':
                        const arr = error.constraints[constraint].split(' ');
                        if (arr.length === 16) {
                            code = '0065';
                            constraints = {
                                c1: arr[8],
                                c2: arr[15],
                            };
                        } else if (arr[3] === 'longer') {
                            code = '0066';
                            constraints = {
                                c1: arr[8],
                            };
                        } else {
                            code = '0067';
                            constraints = {
                                c1: arr[8],
                            };
                        }
                        break;
                    case 'isUppercase':
                        code = '006';
                        break;
                    case 'minLength':
                        code = '0069';
                        constraints = {
                            c1: error.constraints[constraint].split(' ')[8],
                        };
                        break;
                    case 'maxLength':
                        code = '0070';
                        constraints = {
                            c1: error.constraints[constraint].split(' ')[8],
                        };
                        break;
                    case 'matches':
                        code = '0071';
                        constraints = {
                            c1: error.constraints[constraint].split(' ')[3],
                        };
                        break;
                    case 'isMilitaryTime':
                        code = '0072';
                        break;
                    case 'isHash':
                        code = '0073';
                        constraints = {
                            c1: error.constraints[constraint].split(' ').pop(),
                        };
                        break;
                    case 'isISSN':
                        code = '0074';
                        break;
                    case 'arrayContains':
                        code = '0075';
                        constraints = {
                            c1: error.constraints[constraint].split(' ')[3],
                        };
                        break;
                    case 'arrayNotContains':
                        code = '0076';
                        constraints = {
                            c1: error.constraints[constraint].split(' ')[4],
                        };
                        break;
                    case 'arrayNotEmpty':
                        code = '0077';
                        break;
                    case 'arrayMinSize':
                        code = '0078';
                        constraints = {
                            c1: error.constraints[constraint].split(' ')[5],
                        };
                        break;
                    case 'arrayMaxSize':
                        code = '0079';
                        constraints = {
                            c1: error.constraints[constraint].split(' ')[6],
                        };
                        break;
                    case 'arrayUnique':
                        code = '0080';
                        break;
                    case 'isInstance':
                        code = '0081';
                        constraints = {
                            c1: error.constraints[constraint].split(' ').pop(),
                        };
                        break;
                    case 'whitelistValidation':
                        code = '0082';
                        break;
                    default:
                }

                const validationError = <ValidationErrorInterface>{};
                validationError.code = `TR-V${code}`;
                validationError.name = error.property;
                validationError.message = error.constraints[constraint];
                if (typeof constraints !== 'undefined') {
                    validationError.meta = constraints;
                }

                validationErrors.push(validationError);
            }
        }
    }

    if (validationErrors.length) {
        throw new BadRequestException({
            code: 'TR-V0000',
            message: 'Validation errors',
            validationErrors,
        });
    }
}
