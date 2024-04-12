=begin
CSCA Toast Manager
version: 1.1.3 (03.08.2020)
Created by: Casper Gaming and Philes (Oleg Olegovich)

Compatibility:
Made for RPGVXAce
IMPORTANT: ALL CSCA Scripts should be compatible with each other unless
otherwise noted.
Requires CSCA Core Script v1.0.4+
Suggested order: Paste below CSCA Core script, but above all other CSCA Scripts.

FFEATURES
Creates an easy-to-use toast system. Mainly a scripting tool, but you can create
and call your own basic toasts as well. More information on how to do so in the
script call section below.

SETUP
Set up required. Instructions below.

Scripters: it is recommended to alias and add your custom display codes in the
refresh method of CSCA_Window_Toast. If relying on this script to display toasts
in your own script, please link to original CSCA Toast Manager script topic on
rpgmakervxace.net
================================================== ==============================
UPDATES:
Version 1.0.0
-Original Script

Version 1.1.0
-Toasts now global (not confined to the map scene). Certain scenes are excluded.

Version 1.1.1
-Toasts now have a z value of 1000.
================================================== ==============================
CREDIT and TERMS:
Please visit http://www.caspergaming.com/dev/terms_of_use/ for terms of use and
credit guidelines
=end
module CSCA
  module TOASTS
  #================================================= =============================
  # ** Important Script Calls
  #================================================= =============================
  # bt_reserve_toast(text1, text2)
  # Reserves a toast with 2 lines of centered text on it.
  # text1 is the first line, text2 is the second line.
  #================================================= =============================
  # ** Begin Setup
  #================================================= =============================
  SHOW_COUNT = 160 # Amount of frames to show each toast. Recommended 160.
  FADE_SPEED = 16 # Speed of fade in/out. Recommended 16.
  #================================================= =============================
  # ** End Setup
  #================================================= =============================
  end
  end
  $imported = {} if $imported.nil?
  $imported["CSCA-ToastManager"] = true
  #================================================= =============================
  # ** Game_Interpreter
  #------------------------------------------------------------------------------
  # Adds basic toast reservation method for non-scripters
  #================================================= =============================
  class Game_Interpreter
  #--------------------------------------------------------------------------
  # Basic Text toast reservation, creates a toast with 2 lines of text.
  #--------------------------------------------------------------------------
  def bt_reserve_toast(text1, text2)
  $csca.reserve_toast([:csca_bt, text1, text2])
  end
  end
  #================================================= =============================
  # ** CSCA_Window_Toast
  #------------------------------------------------------------------------------
  # This window handles toast data.
  #================================================= =============================
  class CSCA_Window_Toast < Window_Base
  attr_reader :show_count
  attr_reader :toast_gone
  #--------------------------------------------------------------------------
  # Object Initialization
  #--------------------------------------------------------------------------
  def initialize(order)
  # Координаты левого верхнего угла тоста:
  x = 0
  y = 0
  
  # Базовые высота и ширина тоста:
  height = line_height * 3
  width = Graphics.width / 3
  
  super(x, y, width, height)
  self.opacity = 0
  self.contents_opacity = 0
  self.z = 1000
  @show_count = 0
  @toast_gone = true
  end
  
  #def contents_width
  # return [Graphics.width / 3 - 24, self.width - 24].max
  #end
  #--------------------------------------------------------------------------
  # Get order height modifier
  #--------------------------------------------------------------------------
  def get_order_modifier(order)
  return case order
  when :bottom; 6
  when :middle; 3
  when :top; 0
  end
  end
  #--------------------------------------------------------------------------
  # Frame Update
  #--------------------------------------------------------------------------
  def update
  super
  if @show_count > 0
  update_fadein
  @show_count -= 1
  else
  update_fadeout unless @toast_gone
  end
  end
  #--------------------------------------------------------------------------
  # Update Fadein
  #--------------------------------------------------------------------------
  def update_fadein
  self.opacity += CSCA::TOASTS::FADE_SPEED
  self.contents_opacity += CSCA::TOASTS::FADE_SPEED
  end
  #--------------------------------------------------------------------------
  # Update Fadeout
  #--------------------------------------------------------------------------
  def update_fadeout
  self.opacity -= CSCA::TOASTS::FADE_SPEED
  self.contents_opacity -= CSCA::TOASTS::FADE_SPEED
  @toast_gone = true if self.opacity <= 0 && self.contents_opacity <= 0
  end
  #--------------------------------------------------------------------------
  # Writer method
  #--------------------------------------------------------------------------
  def show_count=(amount)
  @show_count = amount
  @toast_gone = false
  end
  #--------------------------------------------------------------------------
  # Refresh
  #--------------------------------------------------------------------------
  def refresh(params)
  contents.clear
  if params[0] == :csca_bt
  draw_text_ex(standard_padding, 0, params[1])
  draw_text_ex(standard_padding, line_height, params[2])
  end
  end
  end
  
  #================================================= =============================
  # ** CSCA_Core
  #------------------------------------------------------------------------------
  # Handles toast data.
  #Aliases: initialize
  #================================================= =============================
  class CSCA_Core
  attr_reader :toasts
  #--------------------------------------------------------------------------
  # Alias Method; object initialization
  #--------------------------------------------------------------------------
  alias :csca_toast_init :initialize
  def initialize
  csca_toast_init
  @toasts = []
  end
  #--------------------------------------------------------------------------
  # Reserve Toast for display
  #--------------------------------------------------------------------------
  def reserve_toast(params)
  return if SceneManager.no_toast_scene?
  @toasts.push(params)
  end
  end
  #================================================= =============================
  # ** SceneManager
  #------------------------------------------------------------------------------
  # Determines if the scene creates toasts.
  #================================================= =============================
  module SceneManager
  #--------------------------------------------------------------------------
  # Don't create toasts?
  #--------------------------------------------------------------------------
  def self.no_toast_scene?
  scene_is?(Scene_Title) || scene_is?(Scene_Gameover) || scene_is?(Scene_Debug) ||
  scene_is?(Scene_File) || scene_is?(Scene_Save) || scene_is?(Scene_Load) ||
  scene_is?(Scene_End) || scene_is?(Scene_Name)
  end
  end
  #================================================= =============================
  # ** Scene_Map
  #------------------------------------------------------------------------------
  # Handles display of toasts
  #Aliases: create_all_windows, update
  #================================================= =============================
  class Scene_Base
  #--------------------------------------------------------------------------
  # Alias Method; Create All Windows
  #--------------------------------------------------------------------------
  alias :csca_create_toast_windows :start
  def start
  csca_create_toast_windows
  create_toast_windows unless SceneManager.no_toast_scene?
  end
  #--------------------------------------------------------------------------
  # Alias Method; Frame Update
  #--------------------------------------------------------------------------
  alias :csca_toast_update :update
  def update
  csca_toast_update
  update_toasts
  end
  #--------------------------------------------------------------------------
  # Create Toast Windows
  #--------------------------------------------------------------------------
  def create_toast_windows
  @toast_bottom = CSCA_Window_Toast.new(:bottom)
  @toast_middle = CSCA_Window_Toast.new(:middle)
  @toast_top = CSCA_Window_Toast.new(:top)
  @toast_list = [@toast_bottom, @toast_middle, @toast_top]
  @toast_bottom.viewport = @viewport
  @toast_middle.viewport = @viewport
  @toast_top.viewport = @viewport
  end
  #--------------------------------------------------------------------------
  # Update Toast Display
  #--------------------------------------------------------------------------
  def update_toasts
  $csca.toasts.each do |params|
  break if params.nil? || no_toast_possible?
  create_toast(params)
  end
  end
  #--------------------------------------------------------------------------
  # Check if all 3 toasts in use
  #--------------------------------------------------------------------------
  def no_toast_possible?
  return !@toast_bottom.toast_gone && !@toast_middle.toast_gone && !@toast_top.toast_gone
  end
  #--------------------------------------------------------------------------
  # Create Toast
  #--------------------------------------------------------------------------
  def count_width(params)
  width = Graphics.width / 3
  @str0 = ""
  @str1 = ""
  if params[0] == :csca_bt
  @str0 = params[1].gsub(/\\[^inpvg]\[\d{0,3}\]/) { "" }
  @str0.gsub!(/\\i\[\d{0,3}\]/) { " " }
  @str0.gsub!(/\\n\[(\d{0,3})\]/) { actor_name($1.to_i) }
  @str0.gsub!(/\\p\[(\d{0,3})\]/) { party_member_name($1.to_i) }
  @str0.gsub!(/\\v\[(\d+)\]/) { $game_variables[$1.to_i] }
  @str0.gsub!(/\eG/i) { Vocab::currency_unit }
  width = [(@toast_bottom.text_size(@str0)).width + 12, width].max
  @str1 = params[2].gsub(/\\[^inpvg]\[\d{0,3}\]/) { "" }
  @str1.gsub!(/\\i\[\d{0,3}\]/) { " " }
  @str1.gsub!(/\\n\[(\d{0,3})\]/) { actor_name($1.to_i) }
  @str1.gsub!(/\\p\[(\d{0,3})\]/) { party_member_name($1.to_i) }
  @str1.gsub!(/\\v\[(\d+)\]/) { $game_variables[$1.to_i] }
  @str1.gsub!(/\eG/i) { Vocab::currency_unit }
  width = [(@toast_bottom.text_size(@str1)).width + 12, width].max
  end
  @toast_list[0].width = @toast_list[1].width = @toast_list[2].width = width
  @toast_list[0].contents = @toast_list[1].contents = @toast_list[2].contents = Bitmap.new(@toast_list[0].contents_width, @toast_list[0].contents_height)
  end
  
  def create_toast(params)
  $csca.toasts.delete(params)
  count_width(params)
  for toast in @toast_list.each
  if toast.toast_gone
  toast.refresh(params)
  toast.show_count = CSCA::TOASTS::SHOW_COUNT
  break
  end
  end
  end
  end