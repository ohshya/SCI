import logging

from core.error_codes import ERROR_CODES, GENERIC_MESSAGES
from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException


async def exception_handler(request: Request, exc: Exception):
    if isinstance(exc, HTTPException):
        detail = exc.detail
        if isinstance(detail, dict) and "code" in detail:
            error_code = detail.get("code", 0)
            toast = detail.get("toast", False)
            error_info = ERROR_CODES.get(error_code)
            if error_info:
                generic_id = error_info["generic"]
                generic_msg = GENERIC_MESSAGES.get(generic_id, "Error interno")
                description = error_info["description"]
            else:
                generic_msg = "Error desconocido"
                description = "Código no registrado"
            log_msg = f"{request.method} - {request.url.path} - {exc.status_code} - ({error_code}) {description}"
            logging.error(log_msg)
            return JSONResponse(
                status_code=exc.status_code,
                content={
                    "error": {
                        "code": error_code,
                        "message": generic_msg,
                        "toast": toast,
                    }
                },
            )
        else:
            logging.error(
                f"{request.method} - {request.url.path} - {exc.status_code} - {exc.detail}"
            )
            return JSONResponse(
                status_code=exc.status_code,
                content={
                    "error": {
                        "code": f"HTTP{exc.status_code}",
                        "message": "Error en la solicitud",
                        "toast": False,
                    }
                },
            )
    elif isinstance(exc, RequestValidationError):
        logging.error(
            f"{request.method} - {request.url.path} - 422 - (VAL001) Error de validación"
        )
        return JSONResponse(
            status_code=422,
            content={
                "error": {
                    "code": "VAL001",
                    "message": GENERIC_MESSAGES[7],
                    "toast": True,
                }
            },
        )
    else:
        logging.error(
            f"{request.method} - {request.url.path} - 500 - Error interno no controlado: {exc}",
            exc_info=True,
        )
        return JSONResponse(
            status_code=500,
            content={
                "error": {
                    "code": "SYS000",
                    "message": "Ha ocurrido un error inesperado en el servidor.",
                    "toast": True,
                }
            },
        )
