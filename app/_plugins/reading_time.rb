# Outputs the reading time, as a number
# Fork of reading_time [1]

# [1]: https://gist.github.com/zachleat/5792681

# "4 minutos"
# Usage: {{ page.content | reading_time }}

module ReadingTimeFilter
  def reading_time( input )
    words_per_minute = 180

    words = input.split.size;
    minutes = ( words / words_per_minute ).floor
    minutes_label = "min"
    minutes > 0 ? "#{minutes} #{minutes_label}" : "1 min"
  end
end

Liquid::Template.register_filter(ReadingTimeFilter)