import httpx
from user_agents import parse


def parse_user_agent(user_agent_string: str) -> str:
    if not user_agent_string:
        return "Unknown"

    ua = parse(user_agent_string)

    browser = f"{ua.browser.family} {ua.browser.version_string}"
    os = f"{ua.os.family} {ua.os.version_string}"
    device = "Mobile" if ua.is_mobile else "Tablet" if ua.is_tablet else "Desktop"

    return f"{browser} - {os} - {device}"


async def get_location_from_ip(ip: str) -> str | None:
    if not ip or ip in ["127.0.0.1", "localhost", "::1"]:
        return None

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"http://ip-api.com/json/{ip}",
                params={"fields": "city,country", "lang": "es"},
                timeout=5.0,
            )

            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "success":
                    city = data.get("city", "")
                    country = data.get("country", "")

                    if city and country:
                        return f"{city}, {country}"
                    elif country:
                        return country
    except Exception:
        pass

    return None
