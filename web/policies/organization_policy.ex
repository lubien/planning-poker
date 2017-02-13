defmodule Poker.Organization.Policy do
  import Ecto.Query, only: [from: 2, where: 2]
  alias Poker.{Repo, User, Organization, OrganizationMember}

  def can?(nil, action, resource)
  when action == :create, do: false

  def can?(%User{id: user_id}, action, resource)
  when action in [:update, :delete] do
    gt_zero = fn x -> x > 0 end

    from(ref in OrganizationMember, select: count(ref.id))
    |> where(user_id: ^user_id, organization_id: ^resource.id)
    |> Repo.one!
    |> gt_zero.()
  end

  def can?(_user, _action, _resource), do: true

  def scope(nil, _action, _query) do
    Organization
    |> where(private: false)
  end

  def scope(%User{id: user_id}, action, [org_id: org_id])
  when action == :show do
    from org in Organization, join: org_user in assoc(org, :organizations_users),
                              where: (org_user.user_id == ^user_id),
                              where: (org.id == ^org_id)
  end

  def scope(%User{id: user_id}, action, [org_id: org_id])
  when action in [:update, :delete] do
    from org in Organization, join: org_user in assoc(org, :organizations_users),
                              where: (org_user.user_id == ^user_id and org_user.role == "admin"),
                              where: (org.id == ^org_id)
  end

  def scope(%User{id: user_id}, _action, _query) do
    from org in Organization, join: org_user in assoc(org, :organizations_users),
                              where: (org.private == false) or
                                     (org_user.user_id == ^user_id)
  end
end
