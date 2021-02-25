defmodule BullsAndCows.GameServer do
  use GenServer

  alias BullsAndCows.BackupAgent
  alias BullsAndCows.Game

  #public interface start

  def reg(name) do
      {:via, Registry, {BullsAndCows.GameReg, name}}
  end

  def start(name) do
    spec = %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [name]},
      restart: :permanent,
      type: :worker
    }
    BullsAndCows.GameSup.start_child(spec)
  end

  def start_link(name) do
    game = BackupAgent.get(name) || Game.new
    GenServer.start_link(
      __MODULE__,
      game,
      name: reg(name)
    )
  end

  def change_text(name, txt) do
    GenServer.call(reg(name), {:change_text, name, txt})
  end

  def guess(name, gs) do
    GenServer.call(reg(name), {:guess, name, gs})
  end

  def peek(name) do
    GenServer.call(reg(name), {:peek, name})
  end

  #implementation start

  def init(game) do
    {:ok, game}
  end

  def handle_call({:change_text, name, txt}, _from, game) do
    game = Game.change_text(game, txt)
    BackupAgent.put(name, game)
    {:reply, game, game}
  end

  def handle_call({:guess, name, gs}, _from, game) do
    game = Game.guess(game, gs)
    BackupAgent.put(name, game)
    {:reply, game, game}
  end

  def handle_call({:peek, _name}, _from, game) do
    {:reply, game, game}
  end

end
