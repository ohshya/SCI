from fastapi import APIRouter, HTTPException

systemRouter = APIRouter(tags=["System"], prefix="/system")


@systemRouter.get("/test-error/{status_code}")
async def test_error_handling(status_code: int, toast: bool = False):
    if 400 <= status_code <= 599:
        raise HTTPException(
            status_code=status_code,
            detail={"code": "TEST001", "toast": toast},
        )
    raise RuntimeError(f"código: '{status_code}', error del sistema simulado.")
