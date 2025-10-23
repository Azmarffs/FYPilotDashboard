import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Save, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function Availability() {
  const { toast } = useToast();
  const [showBlockDateModal, setShowBlockDateModal] = useState(false);
  const [showRecurringModal, setShowRecurringModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [blockReason, setBlockReason] = useState("");

  const [weeklyAvailability, setWeeklyAvailability] = useState([
    { day: "Monday", slots: ["9:00 AM - 11:00 AM", "2:00 PM - 4:00 PM"], available: true },
    { day: "Tuesday", slots: ["10:00 AM - 12:00 PM", "3:00 PM - 5:00 PM"], available: true },
    { day: "Wednesday", slots: ["9:00 AM - 11:00 AM"], available: true },
    { day: "Thursday", slots: ["2:00 PM - 4:00 PM"], available: true },
    { day: "Friday", slots: [], available: false },
  ]);

  const [blockedDates] = useState([
    { date: "Nov 20-22, 2025", reason: "Conference attendance" },
    { date: "Dec 1, 2025", reason: "Medical appointment" },
  ]);

  const toggleDayAvailability = (day: string) => {
    setWeeklyAvailability(
      weeklyAvailability.map(slot =>
        slot.day === day ? { ...slot, available: !slot.available } : slot
      )
    );
  };

  const handleBlockDate = () => {
    if (!blockReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for blocking this date",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Date Blocked",
      description: "The selected date has been marked as unavailable",
    });
    setShowBlockDateModal(false);
    setBlockReason("");
  };

  const handleSaveAvailability = () => {
    toast({
      title: "Availability Saved",
      description: "Your availability schedule has been updated",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Availability Management</h1>
          <p className="text-muted-foreground">Manage your schedule for panel assignments and evaluations</p>
        </div>
        <Button onClick={handleSaveAvailability} data-testid="button-save-availability">
          <Save className="h-4 w-4 mr-2" />
          Save Availability
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold mb-6">Weekly Availability</h3>
          <div className="space-y-4">
            {weeklyAvailability.map((slot) => (
              <div
                key={slot.day}
                className={`p-4 rounded-lg border ${
                  slot.available ? "bg-success/5 border-success/20" : "bg-muted"
                }`}
                data-testid={`availability-${slot.day}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={slot.available}
                      onCheckedChange={() => toggleDayAvailability(slot.day)}
                      data-testid={`checkbox-${slot.day}`}
                    />
                    <h4 className="font-semibold">{slot.day}</h4>
                    {slot.available ? (
                      <Badge variant="outline" className="bg-success/10 text-success border-success">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Not Available</Badge>
                    )}
                  </div>
                </div>
                {slot.available && slot.slots.length > 0 && (
                  <div className="flex flex-wrap gap-2 pl-8">
                    {slot.slots.map((timeSlot) => (
                      <Badge key={timeSlot} variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {timeSlot}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowRecurringModal(true)}
              data-testid="button-set-recurring"
            >
              Set Recurring Pattern
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Calendar</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <Button
              className="w-full mt-4"
              variant="outline"
              onClick={() => setShowBlockDateModal(true)}
              data-testid="button-block-date"
            >
              Block Selected Date
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Blocked Dates</h3>
            <div className="space-y-3">
              {blockedDates.map((block, index) => (
                <div key={index} className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-semibold text-sm">{block.date}</p>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{block.reason}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={showBlockDateModal} onOpenChange={setShowBlockDateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block Date</DialogTitle>
            <DialogDescription>
              Mark this date as unavailable for panel assignments
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Selected Date</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedDate?.toLocaleDateString()}
              </p>
            </div>
            <div>
              <Label>Reason</Label>
              <Textarea
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="E.g., Conference, personal leave, other commitments..."
                className="mt-2"
                data-testid="input-block-reason"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlockDateModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleBlockDate} data-testid="button-confirm-block">
              Block Date
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRecurringModal} onOpenChange={setShowRecurringModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Recurring Availability</DialogTitle>
            <DialogDescription>Define your regular weekly schedule</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Day of Week</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="tuesday">Tuesday</SelectItem>
                  <SelectItem value="wednesday">Wednesday</SelectItem>
                  <SelectItem value="thursday">Thursday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Time</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>End Time</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRecurringModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({ title: "Recurring Schedule Set" });
                setShowRecurringModal(false);
              }}
            >
              Save Pattern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
