defmodule BullsAndCows.Game do

  def new do
    %{
      secret: get_random(),
      #secret: ["1", "2", "3", "4"],
      guesses: [],
      results: [],
      text: "",
      message: "",
    }
  end

  def view(st) do
    # view for end user to see
    %{
      guesses: st.guesses,
      results: st.results,
      text: st.text,
      message: st.message,
    }
  end

  def change_text(st, txt) do
    st = %{ st | text: txt}
    st
  end

  def get_random() do
    # gets the random 4 digit num for secret
    d1 = Enum.random([0,1,2,3,4,5,6,7,8,9])
    d2 = Enum.random(List.delete([0,1,2,3,4,5,6,7,8,9], d1))
    d3 = Enum.random(List.delete(List.delete([0,1,2,3,4,5,6,7,8,9], d1), d2))
    d4 = Enum.random(List.delete(List.delete(List.delete([0,1,2,3,4,5,6,7,8,9], d1), d2), d3))

    str = [Integer.to_string(d1), Integer.to_string(d2), Integer.to_string(d3),
      Integer.to_string(d4)]
    str
  end

  def guess(st, gs) do
    arrGs = Enum.uniq(String.split(List.last(gs), "", trim: true))
    cond do
      #Invalid Guess, not all nums
      !Enum.all?(arrGs, fn x ->
       Enum.member?(["1","2","3","4","5","6","7","8","9","0"], x) end) ->
         st = %{ st | message: "Invalid input. Try again." }
         st = %{ st | text: "" }
         st
      #last guess
      Enum.count(st.guesses) == 7 ->
        cond do
          arrGs == st.secret ->
            st = %{ st | message: "You Win!" }
            st
          arrGs != st.secret ->
            st = %{ st | guesses: st.guesses ++ [arrGs] }
            st = %{ st | results: st.results ++ [get_results(st, arrGs)] }
            st = %{ st | message: "You Lose! Press Reset button to try again." }
            st
        end
      arrGs == st.secret ->
        st = %{ st | message: "You Win!" }
        st
      Enum.count(arrGs) == 4 ->
        st = %{ st | guesses: st.guesses ++ [arrGs] }
        st = %{ st | results: st.results ++ [get_results(st, arrGs)] }
        st = %{ st | message: "" }
        st = %{ st | text: "" }
        st
      #invalid guess, not 4 digs
      Enum.count(arrGs) != 4 ->
        st = %{ st | message: "Invalid input. Try again." }
        st = %{ st | text: "" }
        st
    end
  end

  def get_results(st, gs) do
    sec = st.secret
    cond do
      sec == gs ->
        #Win
        "You Win!"
      sec != gs ->
        #check for bulls
        {bulls, newSec, newGs} = check_bulls(sec, gs, 0, sec, gs)

        #check for cows
        cows = check_cows(newSec, newGs)

        bac = "Bulls: " <> Integer.to_string(bulls) <> " " <>
              "Cows: " <> Integer.to_string(cows)
        bac
    end
  end

  def check_bulls(sec, gs, num, newSec, newGs) do
    case sec do
      [] ->
        #list is mt, return num
        {num, newSec, newGs}
      _ ->
      cond do
        hd(sec) == hd(gs) ->
          #remove heads, add 1 b or c, check again
          check_bulls(tl(sec), tl(gs), num+1, tl(sec), tl(gs))
        hd(sec) != hd(gs) ->
          #remove heads, check again
          check_bulls(tl(sec), tl(gs), num, newSec, newGs)
      end
    end
  end

  def check_cows(sec, gs) do
    secSet = MapSet.new(sec)
    gsSet = MapSet.new(gs)
    num = (Enum.count(sec)) -
      (MapSet.size(MapSet.difference(secSet, gsSet)))
    num
  end


end
