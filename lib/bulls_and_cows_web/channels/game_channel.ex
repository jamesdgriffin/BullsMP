defmodule BullsAndCowsWeb.GameChannel do
  use BullsAndCowsWeb, :channel

  alias BullsAndCows.Game
  alias BullsAndCows.BackupAgent
  alias BullsAndCows.GameServer

  @impl true
  def join("game:" <> name, payload, socket) do
    if authorized?(payload) do
      GameServer.start(name)
      view = GameServer.peek(name)
      |> Game.view("")
      socket = assign(socket, :name, name)
      {:ok, view, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("changeText", %{"text" => text}, socket) do
    user = socket.assigns[:user]
    name = socket.assigns[:name]
    view = GameServer.change_text(name, text)
    |> Game.view(user)
    broadcast(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("guess", %{"guesses" => word}, socket) do
    user = socket.assigns[:user]
    name = socket.assigns[:name]
    view = GameServer.guess(name, word)
    |> Game.view(user)
    broadcast(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("login", %{"user" => user}, socket) do
    socket = assign(socket, :user, user)
    name = socket.assigns[:name]
    view = GameServer.peek(name)
    |>Game.view(user)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("reset", _, socket) do
    user = socket.assigns[:user]
    name = socket.assigns[:name]
    view = GameServer.reset(name)
    |> Game.view(user)
    broadcast(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
