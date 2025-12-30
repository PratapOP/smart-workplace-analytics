from dataclasses import dataclass
from typing import Optional


@dataclass
class User:
    """
    Lightweight user domain model.

    This model represents authenticated users conceptually.
    It is NOT tied to any database or ORM yet.
    """

    id: Optional[int]
    name: str
    email: str
    role: str  # HR | MANAGER | EMPLOYEE
    is_active: bool = True

    def is_hr(self) -> bool:
        return self.role.upper() == "HR"

    def is_manager(self) -> bool:
        return self.role.upper() == "MANAGER"

    def is_employee(self) -> bool:
        return self.role.upper() == "EMPLOYEE"

    def can_view_organization_data(self) -> bool:
        """
        HR can view org-level data.
        Managers may view scoped team data (handled elsewhere).
        """
        return self.is_hr()

    def can_view_team_data(self) -> bool:
        """
        HR and Managers can view team-level data.
        """
        return self.is_hr() or self.is_manager()

    def can_view_personal_data(self) -> bool:
        """
        All users can view their own personal data.
        """
        return self.is_active
